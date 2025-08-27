import * as PopoverPrimitive from "@radix-ui/react-popover";
import type * as React from "react";

import { cn } from "@/shared/lib/classname";
import styles from "./Popover.module.scss";

const Popover = ({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) => {
	return <PopoverPrimitive.Root data-slot="popover" {...props} />;
};

const PopoverTrigger = ({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) => {
	return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
};

const PopoverContent = ({
	className,
	align = "center",
	sideOffset = 4,
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) => {
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				data-slot="popover-content"
				align={align}
				sideOffset={sideOffset}
				className={cn(styles.basic, className)}
				{...props}
			/>
		</PopoverPrimitive.Portal>
	);
};

const PopoverAnchor = ({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) => {
	return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
};

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
