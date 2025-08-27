import type * as React from "react";

import { cn } from "@/shared/lib/classname";
import { useFormField } from "@/shared/lib/hooks/useFormField.ts";

export const FormDescription = ({
	className,
	...props
}: React.ComponentProps<"p">) => {
	const { formDescriptionId } = useFormField();

	return (
		<p
			data-slot="form-description"
			id={formDescriptionId}
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
};
