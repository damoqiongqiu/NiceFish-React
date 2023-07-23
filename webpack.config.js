module.exports = function (env, argv) {
    let mode = (process.env.NODE_ENV === "development") ? "dev" : "prod";
    return require(`./config/webpack.${mode}`);
};
