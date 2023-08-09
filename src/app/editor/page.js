"use client";

import Button from "@/components/Button";
import LightItem from "@/components/Light/Item";
import LightRow from "@/components/Light/Row";
import { faDownload, faPaintBrush, faUpload, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useState } from "react";

export default function EditorPage() {
	const [config] = useState({
		columns: 32,
		rows: 32,
		colors: {
			red: {
				color: "#FF0000",
				activeColor: "bg-red-500 shadow-[0_0_20px_5px_#FF0000]",
				defaultColor: "bg-red-500/50",
				buttonColor: "bg-red-500/70 hover:bg-red-700/70",
			},
			blue: {
				color: "#0000FF",
				activeColor: "bg-blue-700 shadow-[0_0_20px_5px_#0000FF]",
				defaultColor: "bg-blue-700/50",
				buttonColor: "bg-blue-700/70 hover:bg-blue-900/70",
			},
			green: {
				color: "#00FF00",
				activeColor: "bg-emerald-500 shadow-[0_0_20px_5px_#00FF00]",
				defaultColor: "bg-emerald-500/50",
				buttonColor: "bg-emerald-500/70 hover:bg-emerald-700/70",
			},
			amber: {
				color: "#FFD700",
				activeColor: "bg-amber-500 shadow-[0_0_20px_5px_#FFD700]",
				defaultColor: "bg-amber-500/50",
				buttonColor: "bg-amber-500/70 hover:bg-amber-700/70",
			},
			white: {
				color: "#FFFFFF",
				activeColor: "bg-white/90 shadow-[0_0_20px_5px_#FFFFFF]",
				defaultColor: "bg-white/40",
				buttonColor: "bg-white/50 hover:bg-white/70",
			},
		}
	});
	const [lights, setLights] = useState([]);

	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentBpm, setCurrentBpm] = useState(600);
	const [currentColor, setCurrentColor] = useState(null);
	
	// Initial setup
	const selectColor = useCallback((key) => {
		if (key === "none")
			return setCurrentColor(null);

		const value = config.colors[key];
		setCurrentColor([key, value]);
	}, [config])

	useEffect(() => {
		const rows = [];
		for (let i = 0; i < config.rows; i++) {
			const row = [];

			for (let j = 0; j < config.columns; j++) {
				row.push({
					row: i,
					column: j,
					color: null,
					isOn: false,
				});
			}

			rows.push(row);
		}

		setLights(rows);

		const colors = Object.keys(config.colors);
		selectColor(colors[0]);

		const handleKeyDown = ({ key }) => {
			if (isNaN(parseInt(key))) return;
			
			const index = parseInt(key) - 1;
			if (index < 0 || index >= Object.keys(config.colors).length) return;

			const colorKey = Object.keys(config.colors)[index];
			selectColor(colorKey);
		}

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		}
	}, [config, selectColor]);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex(currentIndex => (config.rows <= currentIndex + 1 ? 0 : currentIndex + 1));
		}, 1000 / (currentBpm / 60));

		return () => clearInterval(interval);
	}, [config.rows, currentBpm]);

	const selectLight = useCallback((type, row, column, e) => {
		e.preventDefault();

		row = parseInt(row);
		column = parseInt(column);

		lights[row][column].color = (type === "left" ? currentColor : null);

		setLights(lights);
	}, [currentColor, lights]);

	return (
		<main className="min-h-screen">
			<div className="flex">
				{/* Toolbar */}
				<aside className="flex flex-col space-y-6 min-w-[300px] px-4 py-8 bg-neutral-950">
					<div>
						<h1 className="text-center font-semibold text-lg mb-1">Editor</h1>
						<hr className="border-white/10" />
					</div>

					{/* Import/export file */}
					<div>
						<div className="flex flex-col space-y-2">
							<Button icon={faUpload} text="Upload your file" size={"sm"} color={"white"} />
							<Button icon={faDownload} text="Download" size={"sm"} color={"green"} />
						</div>
					</div>

					{/* Import/export file */}
					<div>
						<h6 className="text-white/50 mb-1">
							BPM
							<span className="text-xs ml-1 text-white/30">({currentBpm})</span>
						</h6>
						<input type="range" min={150} step={50} value={currentBpm} max={900} onChange={({ target }) => setCurrentBpm(target.value)} className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-white/10" />
					</div>

					{/* Colors */}
					<div>
						<h6 className="text-white/50 mb-1">Colors</h6>
						<div className="grid grid-cols-3 gap-2">
							{
								Object.entries(config.colors).map(([key, color], index) => (
									<Button key={key} icon={ faPaintBrush } text={index + 1} className={color.buttonColor} onClick={() => selectColor(key)} size="sm" />
								))
							}
							<Button id="color-null" icon={ faXmark } text="RMB" className="bg-white/10 hover:bg-white/5" size="sm" onClick={() => selectColor("none")} />
						</div>
					</div>
				</aside>
				
				{/* Lights */}
				<section className="w-full flex justify-center px-24 pt-8 pb-4">
					<div className="flex flex-col space-y-6">
						{/* Lights Preview */}
						<div className="w-full">
							<h1 className="text-white/50 text-center">Preview</h1>

							<LightRow index={currentIndex}>
								{
									lights[currentIndex]?.map((light, lightIndex) => (
										<LightItem 
											key={lightIndex}
											light={light}
											rowIndex={currentIndex}
											index={lightIndex + 1}
											currentRow
										/>
									))
								}
							</LightRow>
						</div>

						{/* Lights Editor */}
						<div className="flex flex-col space-y-0.5">
							{
								lights.map((row, rowIndex) => (
									<LightRow key={rowIndex} index={rowIndex} currentIndex={currentIndex}>
										{
											row.map((light, lightIndex) => (
												<LightItem 
													key={lightIndex} 
													light={light}
													rowIndex={rowIndex}
													index={lightIndex}
													onClick={(e) => selectLight("left", rowIndex, lightIndex, e)}
													onRightClick={(e) => selectLight("right", rowIndex, lightIndex, e)}
													currentRow={currentIndex === rowIndex}
												/>
											))
										}
									</LightRow>
								))
							}
						</div>
					</div>
				</section>
			</div>
		</main>
	)
}