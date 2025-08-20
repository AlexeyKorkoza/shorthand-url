import { valibotResolver } from "@hookform/resolvers/valibot";
import { Slot } from "@radix-ui/react-slot";
import { Link, useNavigate } from "@tanstack/react-router";
import { type MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";
import type { InferOutput } from "valibot";

import { useCreateShortUrl } from "@/entities/url/lib/hooks/useCreateShortUrl.ts";
import type { CreateShortUrlDto } from "@/entities/url/model";
import { createShortUrlSchema } from "@/entities/url/validations/create-short-url.schema.ts";
import { ROUTE_PATHS } from "@/shared/routes";
import { Button } from "@/shared/ui/Button";
import { Calendar } from "@/shared/ui/Calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { Form } from "@/shared/ui/Form";
import { FormControl } from "@/shared/ui/FormControl";
import { FormDescription } from "@/shared/ui/FormDescription";
import { FormField } from "@/shared/ui/FormField";
import { FormItem } from "@/shared/ui/FormItem";
import { FormLabel } from "@/shared/ui/FormLabel";
import { FormMessage } from "@/shared/ui/FormMessage";
import { Icons } from "@/shared/ui/Icons";
import { Input } from "@/shared/ui/Input";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover";

type FormData = InferOutput<typeof createShortUrlSchema>;

export const CreateShortUrlForm = () => {
	const [open, setOpen] = useState<boolean>(false);
	const navigate = useNavigate();
	const formMethods = useForm<FormData>({
		defaultValues: {
			alias: "",
			expiredAt: undefined,
			originalUrl: "",
		},
		resolver: valibotResolver(createShortUrlSchema),
		mode: "onChange",
		reValidateMode: "onChange",
	});
	const { control, handleSubmit } = formMethods;

	const { mutateAsync: createShortUrl } = useCreateShortUrl();

	const clearExpireAtField = (event: MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		formMethods.setValue("expiredAt", undefined);
		setOpen(false);
	};

	const submitForm = async (body: CreateShortUrlDto) => {
		try {
			const finalBody: CreateShortUrlDto = {
				originalUrl: body.originalUrl,
			};
			if (body.alias) {
				finalBody.alias = body.alias;
			}
			if (body.expiredAt) {
				finalBody.expiredAt = body.expiredAt;
			}

			await createShortUrl(body);
			await navigate({
				to: ROUTE_PATHS.urls,
			});
		} catch (error) {
			console.log("Error", error);
		}
	};

	return (
		<div className="p-4">
			<Card>
				<CardHeader>
					<CardTitle>Create Short Url</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...formMethods}>
						<form onSubmit={handleSubmit(submitForm)}>
							<FormField
								control={control}
								name="originalUrl"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Original Url</FormLabel>
										<FormControl>
											<Input {...field} placeholder="http://original_url.com" />
										</FormControl>
										<FormDescription />
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={control}
								name="alias"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Alias</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormDescription />
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={control}
								name="expiredAt"
								render={({ field: { onChange, value: date } }) => (
									<FormItem>
										<FormLabel>Expire At</FormLabel>
										<Popover open={open} onOpenChange={setOpen}>
											<PopoverTrigger asChild>
												<Button
													variant="outline"
													id="date"
													className="w-48 justify-between font-normal px-2"
													style={date ? { paddingInline: "0" } : {}}
												>
													{date ? (
														<div className="flex items-center justify-between w-full">
															<div className="flex items-center gap-1">
																<span>{date.toLocaleDateString()}</span>
																<Icons.chevronDownIcon />
															</div>

															<Slot
																onClick={(e) => {
																	clearExpireAtField(e);
																}}
																style={{ display: "inline-flex" }}
															>
																<Icons.close />
															</Slot>
														</div>
													) : (
														<div className="flex items-center gap-1 w-full">
															<span>Select date</span>
															<Icons.chevronDownIcon />
														</div>
													)}
												</Button>
											</PopoverTrigger>
											<PopoverContent
												className="w-auto overflow-hidden p-0"
												align="start"
											>
												<FormControl>
													<Calendar
														mode="single"
														selected={date}
														captionLayout="dropdown"
														onSelect={(date) => {
															onChange(date);
															setOpen(false);
														}}
													/>
												</FormControl>
											</PopoverContent>
										</Popover>
										<FormDescription />
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex items-center justify-center gap-2 my-2">
								<Button asChild variant="outline">
									<Link to={ROUTE_PATHS.urls}>Back</Link>
								</Button>
								<Button type="submit">Create</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};
