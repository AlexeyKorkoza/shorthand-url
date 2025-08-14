import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/shared/lib/classname";
import { buttonVariants } from "@/shared/ui/Button/button-variants.ts";

type Props = React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	};

const Button = (props: Props) => {
	const {
		className = "",
		variant,
		size,
		asChild = false,
		type = "button",
		...rest
	} = props;

	const Component = asChild ? Slot : "button";

	return (
		<Component
			data-slot="button"
			className={cn(buttonVariants({ variant, size }), className)}
			type={type}
			{...rest}
		/>
	);
};

export { Button };
