import { motion } from "motion/react";
import { Button } from "../../../../shared/ui";
import type { NavButtonProps } from "../../../../entities/Nav";


export function NavButton({ children, onClick }: NavButtonProps) {
	return (
		<motion.div
			className="opacity-50"
			whileHover={{ scale: 1.2, opacity: 1 }}
			whileTap={{ scale: 0.9 }}
		>
			<Button size={'xl'} onClick={onClick}>
				{children && children}
			</Button>
		</motion.div>
	)
}