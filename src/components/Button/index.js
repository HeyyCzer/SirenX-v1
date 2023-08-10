import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { tv } = require("tailwind-variants");

const button = tv({
	base: "rounded-md font-semibold text-white flex items-center justify-center gap-x-2 transition-colors ease-in-out",
	variants: {
		size: {
			sm: "px-1 py-1 text-sm",
			md: "px-2 py-1.5",
			lg: "px-4 py-2",
		},
		color: {
			primary: "disabled:bg-neutral-700 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-600",
			secondary: "disabled:bg-neutral-700 disabled:cursor-not-allowed bg-gray-500 hover:bg-gray-600",
			red: "disabled:bg-neutral-700 disabled:cursor-not-allowed bg-red-500 hover:bg-red-600",
			green: "disabled:bg-neutral-700 disabled:cursor-not-allowed bg-green-500 hover:bg-green-600",
			blue: "disabled:bg-neutral-700 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-600",
			indigo: "disabled:bg-neutral-700 disabled:cursor-not-allowed bg-indigo-500 hover:bg-indigo-600",
			purple: "disabled:bg-neutral-700 disabled:cursor-not-allowed bg-purple-500 hover:bg-purple-600",
			pink: "disabled:bg-neutral-700 disabled:cursor-not-allowed bg-pink-500 hover:bg-pink-600",
			gray: "disabled:bg-neutral-700 disabled:cursor-not-allowed bg-gray-500 hover:bg-gray-600",
			white: "disabled:bg-neutral-700 disabled:cursor-not-allowed bg-white hover:bg-gray-200 text-black/80",
			black: "disabled:bg-neutral-700 disabled:cursor-not-allowed bg-black hover:bg-gray-800",
		}
	},
	defaultVariants: {
		size: "md",
		color: "primary"
	}
});

export default function Button({ color, size, icon, text, onClick, className, disabled }) {
	return (
		<button
			className={button({
				color,
				size,
				className,
			})}
			disabled={disabled}
			onClick={onClick}
		>
			{icon && <FontAwesomeIcon icon={icon} />}
			{text}
		</button>
	);
}