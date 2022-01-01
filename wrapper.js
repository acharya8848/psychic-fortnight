var fork = require('child_process').fork;
const exec = require('child_process').exec;

console.log('Starting backend server');
var server = fork('./backend/index.js');

exec('npm start --prefix frontend', (err, stdout) => {
  console.log(stdout);
  console.log('over');
});
