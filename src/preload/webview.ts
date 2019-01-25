
const argv = require('yargs').argv;

const preloadScripts = [];

if (argv.extraPreloads) {
  if (typeof argv.extraPreloads === 'string') {
    preloadScripts.push(argv.extraPreloads);
  } else if ( argv.extraPreloads instanceof Array) {
    preloadScripts.push(...argv.extraPreloads);
  }
}

preloadScripts.forEach((pre) => require(pre));