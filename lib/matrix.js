const DIRECTION = require('./direction');

function add_rows(rows) {
	const size = rows[0].length;
	const result = Array(size).fill(0);
	for (const row of rows) {
		for (let i = 0; i < size; i++) {
			let valueCurrent = result[i];
			let addValue = 0;
			if (i < row.length) addValue = row[i];
			result[i] = valueCurrent + addValue;
		}
	}
	return result;
}

exports.trajectory = (speed, direction, position, size) => {
	const matrix = [];
	while ((position < size) && (position > -1)) {
		const row = Array(size).fill(0);
		row[position] = 1;
		matrix.push(row);
		switch (direction) {
		case DIRECTION.left:
			position -= speed;
			break;
		default:
			position += speed;
		}
	}
	return matrix;
};

exports.add = (matrices) => {
	const result = [];
	let max_rows = 0;
	for (const matrix of matrices) {
		if (matrix.length > max_rows) max_rows = matrix.length;
	}
	for (let row = 0; row < max_rows; row++) {
		const rows = [];
		for (const matrix of matrices) {
			if (row < matrix.length) rows.push(matrix[row]);
		}
		const addedrow = add_rows(rows);
		result.push(addedrow);
	}
	return result;
};
