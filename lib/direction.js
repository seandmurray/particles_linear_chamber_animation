exports.left = 'L';
exports.right = 'R';

exports.valid = (token) => {
	if (
		(exports.left === token) ||
		(exports.right === token)
	) {
		return true;
	}
	return false;
}
