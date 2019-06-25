const isit = require('prose_isit');
const number_util = require('prose_number');
const os_util = require('prose_os');

const matrix = require('./lib/matrix');
const ui = require('./lib/ui');

const arg2Regex = /^[RL\.]+$/;

const prefix = '{';
const postfix = '}';

function help(errors) {
  console.log('Two arguments are required.');
  console.log(' * The first argument must be a valid non zero positive number');
  console.log(' * The second argument must be a non blank string that contains only combinations');
  console.log('   of the following characters: "RL."');
  if (errors.length > 0) {
    console.log('ERRORS');
    for (const error of errors) console.log(error);
  }
  process.exit(1);
}

// Get the CLI args and check size
const args = os_util.getCommandLineArguments();
if (args.length != 2) help();

const errors = [];

// Check the validity fo the speed input
let speed;
const error_num = '"' + args[0] + '" is not a valid number!';
try {
  speed = parseInt(args.shift(), 10);
  if (number_util.zeroNegative(speed)) errors.push(error_num);
}
catch (e) {
  errors.push(error_num);
}

// Check the validity of the string input
const error_string = '"' + args[0] + '" is not a valid string!';
const seedLine = args.shift().toUpperCase();
if (isit.nil(seedLine.match(arg2Regex))) errors.push(error_string);

if (errors.length > 0) help(errors);

// All looks well, process the input
const lines = ui.parseMatric2Output(matrix.add(ui.parseCli2Trajecoties(speed, seedLine)));
// print to screen
console.log(prefix + '"' + lines[0] + '",');
for (let i = 1; i < lines.length - 1; i++) {
  console.log('"' + lines[i] + '",');
}
console.log('"' + lines[lines.length - 1] + '"' + postfix);
