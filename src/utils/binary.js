function decimalToBinary(decimal) {
	return (decimal >>> 0).toString(2);
}

function binaryToDecimal(binary) {
	return parseInt(binary, 2);
}

export { binaryToDecimal, decimalToBinary };

