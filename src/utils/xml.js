import { binaryToDecimal, decimalToBinary } from "./binary";

function isValidCarcols(object) {
	if (!object.CVehicleModelInfoVarGlobal || !object.CVehicleModelInfoVarGlobal.Sirens) return [false];

	const sirens = object.CVehicleModelInfoVarGlobal.Sirens;
	if (sirens?.Item)
		return [true, sirens.Item];
	else
		return [false]
}

export { isValidCarcols };

function getLightsFromCarcols(Item, config, updateConfig) {
	const bpm = Item.sequencerBpm["_attributes"].value;

	Item = Item.sirens.Item;

	const rows = [];
	for (let i = 0; i < config.rows; i++) {
		const row = [];

		for (let j = 0; j < config.columns; j++) {
			const carcols = Item[j];
			if ((j === config.columns - 1) && Item.length > config.columns) {
				config.columns = Item.length;
				config.maxColumns = Item.length;
				updateConfig(config);
			} else if (!carcols) {
				config.columns = j;
				config.maxColumns = j;
				updateConfig(config);
				break;
			}

			let carcolsColor = carcols?.color?.["_attributes"]?.value.replace("0xFF", "");
			if (carcolsColor.startsWith("0x00")) {
				carcolsColor = null;
			}

			const active = decimalToBinary(carcols?.flashiness?.sequencer?.["_attributes"]?.value).charAt(i) === "1";

			if (carcolsColor && active) {
				let color = ["custom", {
					color: `#${carcolsColor}`,
					activeColor: {
						backgroundColor: `#${carcolsColor}`,
						boxShadow: `0 0 20px 5px #${carcolsColor}`
					},
					defaultColor: {
						backgroundColor: `#${carcolsColor}66`,
					},
				}];

				row.push({
					row: i,
					column: j,
					color,
				});
			} else {
				row.push({
					row: i,
					column: j,
					color: null,
				});
			}
		}

		rows.push(row);
	}

	return [rows, bpm];
}

function getCarcolsFromLights(lights, bpm, documentItem) {
	const colors = {};
	const binary = {};
	for (let i = 0; i < lights.length; i++) {
		for (let j = 0; j < lights[i].length; j++) {
			if (documentItem.sirens.Item[j]) {
				const light = lights[i][j];
				binary[j] = (binary[j] || "") + (light.color ? "1" : "0");

				if (light.color) {
					colors[j] = light.color[1].color.replace("#", "").toUpperCase();
				}
			}
		}
	}

	for (const key in binary) {
		documentItem.sirens.Item[key].color["_attributes"].value = `0xFF${colors[key] || "FF0000"}`;
		documentItem.sirens.Item[key].flashiness.sequencer["_attributes"].value = binaryToDecimal(binary[key]);
		documentItem.sirens.Item[key].rotation.sequencer["_attributes"].value = binaryToDecimal(binary[key]);
	}

	documentItem.sequencerBpm["_attributes"].value = bpm;

	return documentItem;
}

export { getCarcolsFromLights, getLightsFromCarcols };

