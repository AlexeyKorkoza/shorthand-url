import type * as React from "react";

import { cn } from "@/shared/lib/classname";
import styles from "./Input.module.css";

type Props = React.ComponentProps<"input">;

export const Input = ({ className, type = "text", ...props }: Props) => {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(styles.basic, styles.focus, styles.aria, className)}
			{...props}
		/>
	);
};
