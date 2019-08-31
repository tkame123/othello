const env: string = process.env.NODE_ENV;
const prodConfig = require('../config/prod.yaml');
const devConfig = require('../config/dev.yaml');

export const config = () => {
    if (env === "production" ) { return prodConfig }
    if (env === "development" ) { return devConfig }
    throw new Error('環境未指定')
};
