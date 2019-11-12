const path = require('path');
const fs = require('fs');

const frontendDir = fs.realpathSync(process.cwd());
const baseDir = path.resolve(frontendDir, '../');

module.exports = {
    baseDir,
    frontendDir,
};
