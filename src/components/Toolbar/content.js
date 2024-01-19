import { faDownload, faPaintBrush, faUpload, faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";

export default function ToolbarContent({ config, doc, hiddenFileInput, handleDownload, currentBpm, setCurrentBpm, currentColor, selectColor }) {
	return (
		<>
			{/* Logo */}
			<div>
				<h1 aria-label="SirenX" className="font-bold text-[2rem] flex justify-center space-x-2">
					<span className="-mr-3">Siren</span>
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">X</span>
				</h1>
				<hr className="border-white/10 invisible xl:visible" />
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
					<span className="text-xs ml-1 text-white/30">({currentBpm}) SHIFT + MWHEEL</span>
				</h6>
				<input type="range" min={150} step={50} value={currentBpm} max={900} onChange={({ target }) => setCurrentBpm(target.value)} className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-white/10" />
			</div>

			{/* Colors */}
			<div>
				<h6 className="text-white/50 mb-1">Colors</h6>
				<div className="grid grid-cols-3 gap-2">
					{
						Object.entries(config.colors).map(([key, color], index) => (
							<Button key={key} icon={ faPaintBrush } text={index + 1} className={`${color.buttonColor} ${key === currentColor?.[0] && "scale-75"}`} onClick={() => selectColor(key)} size="sm" />
						))
					}
					<Button id="color-null" icon={ faXmark } text="RMB" className={`bg-white/10 hover:bg-white/5 ${!currentColor && "scale-75"}`} size="sm" onClick={() => selectColor("none")} />
				</div>
			</div>
		</>
	)
}