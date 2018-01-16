const yaml = require('js-yaml');
const fs = require('fs');
const rc = require('rc');

const config = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));
// overwrite from environment
rc('verdaccio', config);
// Code from: https://github.com/rxaviers/cldr
const merge = function () {
    let destination = {},
        sources = [].slice.call(arguments, 0);
    sources.forEach(function (source) {
        let prop;
        for ( prop in source ) {
            if (prop in destination && Array.isArray(destination[prop])) {
                // Concat Arrays
                destination[prop] = destination[prop].concat(source[prop]);
            } else if (prop in destination && typeof destination[prop] === 'object') {
                // Merge Objects
                destination[prop] = merge(destination[prop], source[prop]);

            } else {
                // Set new values
                destination[prop] = source[prop];

            }
        }
    });
    return destination;
};

// variables with special chars
if (config._extra) {
    for ( let extra in config._extra ) {
        config._extra[extra] = JSON.parse(config._extra[extra]);
        config[extra] = merge(config[extra], config._extra[extra]);
    }
}

fs.writeFileSync('run.yaml', yaml.safeDump(config), 'utf8');
