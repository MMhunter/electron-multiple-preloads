

let preloads = require('electron').remote.getCurrentWindow()['preloads'];

preloads.forEach((pre) => require(pre));