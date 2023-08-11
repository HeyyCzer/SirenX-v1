import { tv } from "tailwind-variants";

const heading = tv({
	base: "relative w-fit text-2xl font-bold before:absolute before:-bottom-4 before:left-1/2 before:-translate-x-1/2 before:content-[attr(data-heading)] before:block before:mb-4 before:mx-auto before:w-1/3 before:h-1 before:bg-gradient-to-r before:from-purple-400 before:to-pink-600 before:rounded",
})

export default function Heading({ className, children }) {
	return (
		<h2 className={heading({ className })}>
			{children}
		</h2>
	)
}