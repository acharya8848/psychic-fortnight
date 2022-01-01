var fork = require('child_process').fork;
var server = fork('./backend/index.js');

const exec = require('child_process').exec;
exec('npm run build --prefix frontend', (err, stdout) => {
  console.log(stdout);
  console.log('over');
});
exec('npm start --prefix frontend', (err, stdout) => {
  console.log(stdout);
  console.log('over');
});