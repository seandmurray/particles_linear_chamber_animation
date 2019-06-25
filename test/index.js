const assert = require('assert');

// This is a library available on npmjs that I wrote.
const object_util = require('prose_object');

const direction = require('../lib/direction');
const matrix = require('../lib/matrix');
const ui = require('../lib/ui');

let test;
let expected;

// direction.valid
assert.equal(direction.valid(direction.left), true, 'Valid');
assert.equal(direction.valid(direction.right), true, 'Valid');
assert.equal(direction.valid('.'), false, 'Invalid');
console.log('direction.valid test success');

// matrix.trajectory
test = matrix.trajectory(1, direction.left, 2, 5);
expected = [
	[0, 0, 1, 0, 0],
	[0, 1, 0, 0, 0],
	[1, 0, 0, 0, 0]
];
assert.equal(object_util.equal(test, expected), true, 'Should be equal');
test = matrix.trajectory(2, direction.right, 1, 5);
expected = [
	[0, 1, 0, 0, 0],
	[0, 0, 0, 1, 0]
];
assert.equal(object_util.equal(test, expected), true, 'Should be equal');
console.log('matrix.trajectory test success');

// matrix.add
const columns = 5;
test = matrix.add([
	matrix.trajectory(1, direction.right, 1, columns),
	matrix.trajectory(2, direction.right, 0, columns),
	matrix.trajectory(2, direction.left, columns - 1, columns),
	matrix.trajectory(1, direction.left, columns - 2, columns)
]);
expected = [
	[1, 1, 0, 1, 1],
	[0, 0, 4, 0, 0],
	[1, 1, 0, 1, 1],
	[1, 0, 0, 0, 1]
];
assert.equal(object_util.equal(test, expected), true, 'Should be equal');
console.log('matrix.add test success');

// ui.parseCli
test = ui.parseCli2Trajecoties(1, 'R.L');
expected = [
	[
		[1, 0, 0],
		[0, 1, 0],
		[0, 0, 1]
	],
	[
		[0, 0, 1],
		[0, 1, 0],
		[1, 0, 0]
	]
];
assert.equal(object_util.equal(test, expected), true, 'Should be equal');
console.log('ui.parseCli2Trajecoties test success');

// ui.parseMatric2Output
test = ui.parseMatric2Output(matrix.add(ui.parseCli2Trajecoties(2, '..R....')));
expected = ['..X....', '....X..', '......X', '.......'];
assert.equal(object_util.equal(test, expected), true, 'Should be equal');

test = ui.parseMatric2Output(matrix.add(ui.parseCli2Trajecoties(3, 'RR..LRL')));
expected = ['XX..XXX', '.X.XX..', 'X.....X', '.......'];
assert.equal(object_util.equal(test, expected), true, 'Should be equal');

test = ui.parseMatric2Output(matrix.add(ui.parseCli2Trajecoties(2, 'LRLR.LRLR')));
expected = ['XXXX.XXXX', 'X..X.X..X', '.X.X.X.X.', '.X.....X.', '.........'];
assert.equal(object_util.equal(test, expected), true, 'Should be equal');

test = ui.parseMatric2Output(matrix.add(ui.parseCli2Trajecoties(10, 'RLRLRLRLRL')));
expected = ['XXXXXXXXXX', '..........'];
assert.equal(object_util.equal(test, expected), true, 'Should be equal');

test = ui.parseMatric2Output(matrix.add(ui.parseCli2Trajecoties(1, 'LRRL.LR.LRR.R.LRRL.')));
expected = [
	'XXXX.XX.XXX.X.XXXX.',
	'..XXX..X..XX.X..XX.',
	'.X.XX.X.X..XX.XX.XX',
	'X.X.XX...X.XXXXX..X',
	'.X..XXX...X..XX.X..',
	'X..X..XX.X.XX.XX.X.',
	'..X....XX..XX..XX.X',
	'.X.....XXXX..X..XX.',
	'X.....X..XX...X..XX',
	'.....X..X.XX...X..X',
	'....X..X...XX...X..',
	'...X..X.....XX...X.',
	'..X..X.......XX...X',
	'.X..X.........XX...',
	'X..X...........XX..',
	'..X.............XX.',
	'.X...............XX',
	'X.................X',
	'...................'
];
assert.equal(object_util.equal(test, expected), true, 'Should be equal');

console.log('ui.parseMatric2Output test success');
