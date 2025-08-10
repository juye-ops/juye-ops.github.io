import { motion } from "motion/react";
import type { SwipeBoardProps } from "../../../../entities/Swipe";
import { useSwipeButtonLogic } from "../..";
import { SwipeButton } from "../Button";


export function SwipeBoard({ data }: SwipeBoardProps) {
	const { animate, loadMotion, page, direction, paginate, onAnimate } = useSwipeButtonLogic({ data });

	const selectedIndex = page
	const prevIndex = page === 0 ? data.length - 1 : page - 1;
	const nextIndex = page === data.length - 1 ? 0 : page + 1;

	const fadeInVariants = {
		enter: { opacity: 0 },
		exit: { opacity: 1 },
	};

	const variants = {
		enter: (direction: number) => { return { zIndex: 0, x: direction === 0 ? 0 : direction > 0 ? 200 : -200 }; },
		center: { zIndex: 1, x: 0, opacity: 1 },
		exit: (direction: number) => { return { zIndex: 0, x: direction === 0 ? 0 : direction < 0 ? 200 : -200 }; }
	};

	return (
		<motion.div
			key={animate}
			custom={direction}
			variants={loadMotion ? variants : fadeInVariants}
			initial="enter"
			animate="center"
			exit="exit"
			transition={{
				x: { type: "spring", stiffness: 300, damping: 30 },
			}}
			onAnimationComplete={onAnimate}
		>
			<div className="flex gap-4">
				{page > 0 ?
					<SwipeButton className="w-[200px]" onClick={() => paginate(-1)}> {data[prevIndex].label} </SwipeButton> : <div className="w-[200px]" />
				}
				<SwipeButton className="w-[200px]" onClick={() => paginate(0)}>{data[selectedIndex].label}</SwipeButton>
				{page < data.length - 1 ?
					<SwipeButton className="w-[200px]" onClick={() => paginate(1)}> {data[nextIndex].label} </SwipeButton> : <div className="w-[200px]" />
				}
			</div>
		</motion.div>
	);
}