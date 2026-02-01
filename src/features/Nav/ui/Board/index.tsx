import { motion } from "motion/react";
import { useNavButtonLogic } from "../..";
import { NavButton } from "../Button";
import type { NavBoardProps } from "@/entities/Nav";
import { cn } from "@/shared/utils/cn";


export function NavBoard({ data }: NavBoardProps) {
	const { paginate } = useNavButtonLogic({ data });

	const fadeInVariants = {
		enter: { opacity: 0 },
		exit: { opacity: 1 },
	};

	return (
		<motion.div
			variants={fadeInVariants}
			initial="enter"
			animate="exit"
		>
				<div className={cn("flex items-center justify-center py-4 gap-12")}>
					{data.map((item, index) => (
						<NavButton key={index} onClick={() => paginate(data[index].path)}>
							{item.label}
						</NavButton>
					))}
				</div>
		</motion.div>
	);
}