import { useEffect, useRef } from "react";
import Draggable from "react-draggable";

export default function Spacer({ onDelete }) {
	const ref = useRef(null);
	
	useEffect(() => {
		ref.current.addEventListener("contextmenu", (e) => {
			e.preventDefault();
			
			onDelete();
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Draggable axis="x">
			<div ref={ref} className="absolute z-100 w-10 bg-neutral-500 h-screen" />
		</Draggable>
	)
}