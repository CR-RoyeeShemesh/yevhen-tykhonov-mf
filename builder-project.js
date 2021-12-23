const { series } = require('async');
const { exec } = require('child_process');

const execHandler = (cb) => (err, stdout, stderr) => {
    if (err || stderr) {
        console.error(err || stderr);
    }

    console.log(stdout), cb();
}

series([
    (cb) => exec('cd ./sub-applications/app1 && npm i && npm run build', execHandler(cb)),
    (cb) => exec('cd ./sub-applications/app2 && npm i && npm run build', execHandler(cb)),
    (cb) => exec('cd ./sub-applications/app3 && npm i && npm run build', execHandler(cb)),
    (cb) => exec('cd ./sub-applications/app4 && npm i && npm run build', execHandler(cb)),
    (cb) => exec('npm run client:build', execHandler(cb)),
    (cb) => exec('npm run server:build', execHandler(cb)),
])
    .then(() => { console.log('All projects have been successfully built'); })
    .catch(err => { console.error(err); });
