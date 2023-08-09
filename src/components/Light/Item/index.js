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
	return (
		<button 
			disabled={!onClick} 
			className={light({
				className: (currentRow ? color?.activeColor : color?.defaultColor)
			})} 
			onClick={onClick} 
			onContextMenu={onRightClick}
		>
			{ (rowIndex === 0 && onClick) && index + 1 }
		</button>
	)
}