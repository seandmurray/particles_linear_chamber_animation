const matrix = require('./matrix');
const direction = require('./direction');

const particle = 'X';
const empty = '.';

function emptyline(size) {
	return [...Array(size)].map(() => empty).join('');
}

exports.parseCli2Trajecoties = (speed, line) => {
	const tokens = [...line];
	const size = tokens.length;
	const trajectories = [];
	for (let i = 0; i < size; i++) {
		const value = tokens[i];
		if (direction.valid(value)) {
			trajectories.push(matrix.trajectory(speed, value, i, size));
		}
	}
	return trajectories;
};

exports.parseMatric2Output = (matrix) => {
	const result = [];
	for (let x = 0; x < matrix.length; x++) {
		const row = matrix[x];
		let line = '';
		for (let y = 0; y < row.length; y++) {
			if (row[y] > 0) {
				line += particle;
			}
			else {
				line += empty;
			}
		}
		result.push(line);
	}
	// Add empty line at bottom
	result.push(emptyline(matrix[0].length));
	return result;
};
