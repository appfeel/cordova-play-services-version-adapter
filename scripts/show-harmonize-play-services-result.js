#!/usr/bin/env node
const redError = '\x1b[31m';
const greenSuccess = '\x1b[32m';
const resetColor = '\x1b[0m';

module.exports = function (ctx) {
    deferral = ctx.requireCordovaModule('q').defer();
    if (process.env.adapterSuccess) {
        console.log(`${greenSuccess}\n${process.env.adapterSuccess}${resetColor}\n`);
    } else if (process.env.adapterError) {
        console.log(`${redError}\n${process.env.adapterError}${resetColor}\n`);
    }
    deferral.resolve();
    return deferral.promise;
};
