import { Slot } from "@radix-ui/react-slot";
import type * as React from "react";

import { useFormField } from "@/shared/lib/hooks/useFormField.ts";

export const FormControl = ({
	...props
}: React.ComponentProps<typeof Slot>) => {
	const { error, formItemId, formDescriptionId, formMessageId } =
		useFormField();

	return (
		<Slot
			data-slot="form-control"
			id={formItemId}
			aria-describedby={
				!error
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			{...props}
		/>
	);
};
