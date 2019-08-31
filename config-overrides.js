const rewireYAML = require('react-app-rewire-yaml');

module.exports = function override(config, env) {
    // for react-app-rewire-yaml
    config = rewireYAML(config, env);
    return config;
};
