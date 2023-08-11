import { tv } from "tailwind-variants";

const light = tv({
	base: "h-6 w-10 text-white/20 rounded-sm outline-none ring-none",
	variants: {
		color: {
			unpainted: "bg-white/10",
		}
	},
	defaultVariants: {
		color: "unpainted"
	}
})

export default function LightItem({ light: lightData, onClick, onRightClick, rowIndex, index, currentRow }) {
	const color = lightData?.color ? lightData?.color[1] : null;

	const clickEvent = (e) => {
		// if is left clicked
		if (e.buttons === 1) {
			onClick(e);
		}
		// else if is right clicked
		else if (e.buttons === 2) {
			onRightClick(e);
		}
	}

	return (
		<button 
			disabled={!onClick} 
			className={light({
				className: (!currentRow && color?.defaultColor)
			})} 
			style={ currentRow ? color?.activeColor : color?.defaultColor }
			onMouseDown={clickEvent} 
			onMouseEnter={clickEvent}
		>
			{ (rowIndex === 0 && onClick) && index + 1 }
		</button>
	)
}