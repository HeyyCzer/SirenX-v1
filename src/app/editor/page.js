"use client";

import Button from "@/components/Button";
import LightItem from "@/components/Light/Item";
import LightRow from "@/components/Light/Row";
import { getCarcolsFromLights, getLightsFromCarcols, isValidCarcols } from "@/utils/xml";
import { faDownload, faPaintBrush, faUpload, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import convert from "xml-js";

export default function EditorPage() {
	const [config] = useState({
		columns: 20,
		rows: 32,
		maxColumns: 20,
		colors: {
			red: {
				color: "#FF0000",
				activeColor: {
					backgroundColor: "#FF0000",
					boxShadow: "0 0 20px 5px #FF0000",
				},
				defaultColor: {
					backgroundColor: "rgba(255, 0, 0, 0.4)",
				},
				buttonColor: "bg-red-500/70 hover:bg-red-700/70",
			},
			blue: {
				color: "#0000FF",
				activeColor: {
					backgroundColor: "#0000FF",
					boxShadow: "0 0 20px 5px #0000FF",
				},
				defaultColor: {
					backgroundColor: "rgba(0, 0, 255, 0.4)",
				},
				buttonColor: "bg-blue-700/70 hover:bg-blue-900/70",
			},
			green: {
				color: "#00FF00",
				activeColor: {
					backgroundColor: "#00FF00",
					boxShadow: "0 0 20px 5px #00FF00",
				},
				defaultColor: {
					backgroundColor: "rgba(16, 185, 129, 0.4)",
				},
				buttonColor: "bg-emerald-500/70 hover:bg-emerald-700/70",
			},
			amber: {
				color: "#FFD700",
				activeColor: {
					backgroundColor: "#FFD700",
					boxShadow: "0 0 20px 5px #FFD700",
				},
				defaultColor: {
					backgroundColor: "rgba(255, 215, 0, 0.4)",
				},
				buttonColor: "bg-amber-500 hover:bg-amber-600",
			},
			white: {
				color: "#FFFFFF",
				activeColor: {
					backgroundColor: "rgba(255, 255, 255, 0.9)",
					boxShadow: "0 0 20px 5px #FFFFFF",
				},
				defaultColor: {
					backgroundColor: "rgba(255, 255, 255, 0.3)",
				},
				buttonColor: "bg-white/50 hover:bg-white/60",
			},
		}
	});

	const [lights, setLights] = useState([]);
	const [doc, setDocument] = useState(null);
	const [documentItem, setDocumentItem] = useState(null);

	const hiddenFileInput = useRef(null);

	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentBpm, setCurrentBpm] = useState(600);
	const [currentColor, setCurrentColor] = useState(null);
	
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex(currentIndex => (config.rows <= currentIndex + 1 ? 0 : currentIndex + 1));
		}, 1000 / (currentBpm / 60));

		return () => clearInterval(interval);
	}, [config.rows, currentBpm]);

	const selectLight = useCallback((type, row, column, e) => {
		e.preventDefault();

		if (type === "left") {
			let columns = {};
			for (const row of lights) {
				for (const [index, light] of Object.entries(row)) {
					if (light.color) {
						columns[index] = true;
					}
				}
			}

			const totalColumns = Object.keys(columns).length;
			if (totalColumns >= config.maxColumns && !columns[column]) {
				alert(`You can't have more than ${config.maxColumns} unique columns!`)
				return;
			}
		}

		row = parseInt(row);
		column = parseInt(column);

		lights[row][column].color = (type === "left" ? currentColor : null);

		setLights(lights);
	}, [config.maxColumns, currentColor, lights]);

	const selectColor = useCallback((key) => {
		if (key === "none")
			return setCurrentColor(null);

		const value = config.colors[key];
		setCurrentColor([key, value]);
	}, [config]);

	const handleUpload = useCallback(({ target }) => {
		const file = target.files[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = ({ target: { result }}) => {
			// const parser = new DOMParser();
			// const doc = parser.parseFromString(result, "application/xml");

			const object = JSON.parse(convert.xml2json(result, { compact: true }));

			const [isValid, items] = isValidCarcols(object);
			if (!isValid)
				return alert("The selected file is not a valid carcols.meta file!");

			setDocument(object);
			
			let item = items;
			if (Array.isArray(items)) {
				const ids = {};
				for (const item of items) {
					const id = item.id["_attributes"].value;
					ids[id] = item;
				}

				if (Object.keys(ids).length > 1) {
					const value = prompt("Please enter the ID of the carcols.meta entry you want to use:\n", Object.keys(ids).join("\n"));
					if (!value) return;
					if (!ids[value])
						return alert("Invalid ID!");

					setDocumentItem([value, ids[value]]);
					
					item = ids[value];
				}
			} else {
				setDocumentItem([null, item]);
			}

			setLights(getLightsFromCarcols(item, config));
		}
		reader.readAsText(file);
	}, [config]);

	const handleDownload = useCallback(() => {
		if (!doc) return;

		if (documentItem[0]) {
			doc.CVehicleModelInfoVarGlobal.Sirens.Item[documentItem[0]] = getCarcolsFromLights(lights, documentItem[1]);
		} else {
			doc.CVehicleModelInfoVarGlobal.Sirens.Item = getCarcolsFromLights(lights, documentItem[1]);
		}

		const xml = convert.json2xml(doc, { compact: true, spaces: 4 });
		const blob = new Blob([xml], { type: "application/xml" });
		const url = URL.createObjectURL(blob);

		const a = document.createElement("a");
		a.href = url;
		a.download = "carcols.meta";
		a.click();
	}, [doc, documentItem, lights]);

	//Initial setup
	useEffect(() => {
		const rows = [];
		for (let i = 0; i < config.rows; i++) {
			const row = [];

			for (let j = 0; j < config.columns; j++) {
				row.push({
					row: i,
					column: j,
					color: null,
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

	return (
		<main className="min-h-screen">
			<input type="file" ref={hiddenFileInput} onChange={handleUpload} accept=".meta" className="hidden" />

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
							<Button icon={faUpload} text="Upload your file" size={"sm"} color={"white"} onClick={ () => hiddenFileInput.current.click() } />
							<Button icon={faDownload} text="Download" size={"sm"} color={"green"} onClick={ handleDownload } disabled={ !doc } />
						</div>
					</div>

					{/* Pattern BPM */}
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

					{/* Spacers */}
					{/* <div>
						<h6 className="text-white/50 mb-1">Spacers</h6>
						<Button icon={faPlusCircle} text="Spacer" size="sm" color="white" className="w-full" onClick={() => setSpacers(spacers => [...spacers, Math.random()]) } />
					</div> */}
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