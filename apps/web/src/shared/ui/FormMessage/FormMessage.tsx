import type * as React from "react";

import { cn } from "@/shared/lib/classname";
import { useFormField } from "@/shared/lib/hooks/useFormField.ts";

export const FormMessage = ({
	className,
	...props
}: React.ComponentProps<"p">) => {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message ?? "") : props.children;

	if (!body) {
		return null;
	}

	return (
		<p
			data-slot="form-message"
			id={formMessageId}
			className={cn("text-destructive text-sm", className)}
			{...props}
		>
			{body}
		</p>
	);
};
