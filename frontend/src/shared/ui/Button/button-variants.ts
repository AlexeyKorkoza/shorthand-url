import { cva } from "class-variance-authority";
import styles from "./Button.module.scss";

export const buttonVariants = cva(styles.base, {
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
