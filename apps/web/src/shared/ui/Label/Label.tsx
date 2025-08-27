import * as LabelPrimitive from "@radix-ui/react-label";
import type * as React from "react";

import { cn } from "@/shared/lib/classname";
import styles from "./Label.module.scss";

const Label = ({
	className,
	...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) => {
	return (
		<LabelPrimitive.Root
			data-slot="label"
			className={cn(styles.basic, className)}
			{...props}
		/>
	);
};

export { Label };
