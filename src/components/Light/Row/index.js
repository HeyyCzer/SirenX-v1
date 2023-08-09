export default function LightRow({ index, currentIndex, children }) {
	return (
		<div className={`flex space-x-1 ${index === currentIndex && "bg-white/10"}`}>
			{ children }
		</div>
	)
}