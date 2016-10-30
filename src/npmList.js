import childProcess from 'child_process';
import ora from 'ora';

// const packageName = 'npm-list-cli';
const exec = childProcess.exec;

module.exports =  (listGlobal) => {

  console.log('\n');

  const spinner = ora().start();
  spinner.text = 'Fetching NPMs..'
  spinner.color = 'yellow';

  const globalFlag = (listGlobal) ? '--global' : '';

  getPackages(globalFlag)
    .then((packages) => {
      spinner.stop();
      printPackages(packages, globalFlag);
    })
}

function regexPackageName (str) {
  return str.match(/[a-z0-9-]+@[0-9]+.[0-9]+.[0-9]/gi);
}

function getPackages (globalFlag) {
  return new Promise((resolve, reject) => {
    exec('npm list --depth=0 ' + globalFlag, (err, stdout, stderr) => {

      if (err) reject(err);

      const packagesList = regexPackageName(stdout);

      let packages = [];

      packagesList.forEach((pkg) => {

        packages.push(pkg);
      });

      resolve(packages);
    });
  });
}

function printPackages (packages, globalFlag) {
  if (globalFlag) {
    console.log(`Listing global packages (${packages.length}): \n`);
  } else {
    console.log(`Listing packages (${packages.length}): \n`);
  }
  packages.forEach((pkg) => {
    console.log(' - ' + pkg);
  })
}
