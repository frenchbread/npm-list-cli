import childProcess from 'child_process';
import ora from 'ora';

function regexPackageName (str) {
  return str.match(/[a-z0-9-]+@[0-9]+.[0-9]+.[0-9]/gi);
}

module.exports =  (listGlobal) => {

  const packageName = 'npm-list-cli';
  const exec = childProcess.exec;
  const spinner = ora();

  console.log('\n');

  spinner.text = 'Fetching NPMs..'
  spinner.color = 'yellow';
  spinner.start();

  const globalFlag = (listGlobal) ? '--global' : '';

  exec('npm list --depth=0 ' + globalFlag, (err, stdout, stderr) => {

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
}
