import type * as LabelPrimitive from "@radix-ui/react-label";
import type * as React from "react";

import { cn } from "@/shared/lib/classname";
import { useFormField } from "@/shared/lib/hooks/useFormField.ts";
import { Label } from "@/shared/ui/Label";

export const FormLabel = ({
	className,
	...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) => {
	const { error, formItemId } = useFormField();

	return (
		<Label
			data-slot="form-label"
			data-error={!!error}
			className={cn("data-[error=true]:text-destructive", className)}
			htmlFor={formItemId}
			{...props}
		/>
	);
};
