import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/shared/lib/classname";
import styles from "./Button.module.css";

const buttonVariants = cva(styles.base, {
	variants: {
		variant: {
			default: styles.defaultVariant,
			destructive: styles.destructiveVariant,
			outline: styles.outlineVariant,
			secondary: styles.secondaryVariant,
			ghost: styles.ghostVariant,
			link: styles.linkVariant,
		},
		size: {
			default: styles.defaultSize,
			sm: styles.smSize,
			lg: styles.lgSize,
			icon: styles.iconSize,
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

type Props = React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	};

const Button = ({
	className,
	variant,
	size,
	asChild = false,
	type = "button",
	...props
}: Props) => {
	const Component = asChild ? Slot : "button";

	return (
		<Component
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			type={type}
			{...props}
		/>
	);
};

export { Button, buttonVariants };
