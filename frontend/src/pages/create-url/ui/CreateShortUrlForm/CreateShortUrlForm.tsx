import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import type { InferOutput } from "valibot";

import { useCreateShortUrl } from "@/entities/url/lib/hooks/useCreateShortUrl.ts";
import type { CreateShortUrlDto } from "@/entities/url/model";
import { createShortUrlSchema } from "@/entities/url/validations/create-short-url.schema.ts";
import { Button } from "@/shared/ui/Button";
import { Calendar } from "@/shared/ui/Calendar";
import { Form } from "@/shared/ui/Form";
import { FormControl } from "@/shared/ui/FormControl";
import { FormDescription } from "@/shared/ui/FormDescription";
import { FormField } from "@/shared/ui/FormField";
import { FormItem } from "@/shared/ui/FormItem";
import { FormLabel } from "@/shared/ui/FormLabel";
import { FormMessage } from "@/shared/ui/FormMessage";
import { Input } from "@/shared/ui/Input";

type FormData = InferOutput<typeof createShortUrlSchema>;

export const CreateShortUrlForm = () => {
	const { mutateAsync: createShortUrl } = useCreateShortUrl();
	const formMethods = useForm<FormData>({
		defaultValues: {
			alias: "",
			expiredAt: undefined,
			originalUrl: "",
		},
		resolver: valibotResolver(createShortUrlSchema),
	});
	const { control, handleSubmit } = formMethods;

	const submitForm = async (body: CreateShortUrlDto) => {
		await createShortUrl(body);
	};

	return (
		<div>
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
						render={() => (
							<FormItem>
								<FormLabel>Expire At</FormLabel>
								<FormControl>
									<Calendar />
								</FormControl>
								<FormDescription />
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Create</Button>
				</form>
			</Form>
		</div>
	);
};
