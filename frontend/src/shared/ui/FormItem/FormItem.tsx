import * as React from "react";

import { cn } from "@/shared/lib/classname";
import { FormItemContext } from "@/shared/lib/hooks/useFormField";

export const FormItem = ({
	className,
	...props
}: React.ComponentProps<"div">) => {
	const id = React.useId();

	return (
		<FormItemContext.Provider value={{ id }}>
			<div
				data-slot="form-item"
				className={cn("grid gap-2", className)}
				{...props}
			/>
		</FormItemContext.Provider>
	);
};
