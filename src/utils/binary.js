function decimalToBinary(decimal) {
	let binary = "";
	while (decimal > 0) {
		if (decimal & 1) {
		binary = "1" + binary;
		} else {
		binary = "0" + binary;
		}
		decimal = decimal >> 1;
	}
	return binary;
}

function binaryToDecimal(binary) {
	let decimal = 0;
	for (let i = 0; i < binary.length; i++) {
		decimal = decimal * 2 + parseInt(binary[i]);
	}
	return decimal;
}

export { decimalToBinary, binaryToDecimal };

