import childProcess from 'child_process';
import ora from 'ora';

const packageName = 'npm-list-cli';
const exec = childProcess.exec;
const spinner = ora();

console.log('\n');

spinner.text = 'Fetching NPMs..'
spinner.color = 'yellow';
spinner.start();

exec('npm list --depth=0', (err, stdout, stderr) => {

  spinner.stop();

  if (err) console.error(err);

  const packagesList = regexPackageName(stdout);

  packagesList.forEach((pkg) => {

    if (pkg.indexOf(packageName) === -1) {
      console.log(' - ' + pkg);
    }
  });
  // console.log(stderr);
});

function regexPackageName (str) {
  return str.match(/[a-z0-9-]+@[0-9]+.[0-9]+.[0-9]/gi);
}
