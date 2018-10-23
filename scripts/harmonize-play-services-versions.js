#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const dependencies = require(path.resolve(process.cwd(), 'plugins/cordova-play-services-version-adapter/scripts/dependencies.json'));
const cordovaVersion = require(path.resolve(process.cwd(), 'platforms/android/cordova/version'));
const cordovaLybrary = 'cordova.system.library';
const googleAndroid = 'com.google.android.gms';
const googleFirebase = 'com.google.firebase';
const CORDOVA_VERSIONS = {
    6: {
        name: 'cordova-android@6',
        properties: 'platforms/android/project.properties'
    },
    7: {
        name: 'cordova-android@7',
        properties: 'platforms/android/project.properties'
    }
};


let deferral;

function getBiggerVersion(v1, v2) {
    const v1Params = v1.split('.');
    const v2Params = v2.split('.');
    if (!isNaN(v1Params[0]) && !isNaN(v2Params[0])) {
        if (parseInt(v1Params[0]) < parseInt(v2Params[0])) {
            return v2;
        }
    } else if (isNaN(v1Params[0]) && !isNaN(v2Params[0])) {
        return v2;
    }
    return v1;
}

function run() {
    const version = parseInt(cordovaVersion.version);
    const properties = CORDOVA_VERSIONS[version].properties;
    const data = fs.readFileSync(properties, 'utf8');
    if (data) {
        const actualLines = data.split('\n');
        const libraries = [];
        let minVersion;
        const newLines = [];
        for (let i = 0, n = actualLines.length; i < n; i += 1) {
            const actualLine = actualLines[i];
            if (actualLine.indexOf(cordovaLybrary) > -1) {
                const lineParams = actualLine.split('=');
                const libraryParams = lineParams[1].split(':');
                const package = libraryParams[0];
                const dependency = libraryParams[1];
                const version = libraryParams[2];
                if (package.indexOf(googleAndroid) > -1 || package.indexOf(googleFirebase) > -1) {
                    libraries.push({ library: lineParams[0], package, dependency, version, isGoogle: true });
                    if (!minVersion) {
                        minVersion = { package, dependency, version };
                    } else {
                        if (getBiggerVersion(minVersion.version, version) === version) {
                            minVersion = {
                                package,
                                dependency,
                                version: getBiggerVersion(minVersion.version, version),
                            };
                        }
                    }
                } else {
                    libraries.push({ library: lineParams[0], package, dependency, version, isGoogle: false });
                }
            } else {
                newLines.push(actualLine);
            }
        }
        let error;
        if (libraries.length > 0) {
            const possibleVersions = dependencies.filter(l => getBiggerVersion(l.version, minVersion.version) === l.version);
            const parsedLibraries = libraries.filter(l => l.isGoogle).map(l => {
                if (l.isGoogle) {
                    return `${l.package}:${l.dependency}`;
                }
            });
            const dependency = `${minVersion.package}:${minVersion.dependency}`;
            const version = `${minVersion.version.split('.')[0]}`;
            let newVersion;
            if (isNaN(minVersion.version.split('.')[0])) {
                for (let i = possibleVersions.length - 1, n = 0; i >= n; i -= 1) {
                    const possibleVersion = possibleVersions[i];
                    if (possibleVersion.dependencies.filter(d => parsedLibraries.indexOf(d) > -1).length === parsedLibraries.length) {
                        newVersion = possibleVersion.version;
                        break;
                    }
                }
            } else {
                for (let i = 0, n = possibleVersions.length; i < n; i += 1) {
                    const possibleVersion = possibleVersions[i];
                    if (possibleVersion.dependencies.filter(d => parsedLibraries.indexOf(d) > -1).length === parsedLibraries.length) {
                        newVersion = possibleVersion.version;
                        break;
                    }
                }
            }
            if (newVersion) {
                for (let i = 0, n = libraries.length; i < n; i += 1) {
                    const library = libraries[i];
                    const libraryVersion = library.isGoogle ? newVersion : library.version;
                    newLines.push(`${library.library}=${library.package}:${library.dependency}:${libraryVersion}`);
                }
                const parsedLibrariesVersion = libraries.filter(l => l.isGoogle && l.version !== newVersion).map(l => {
                    if (l.isGoogle && l.version !== newVersion) {
                        return `${l.package}:${l.dependency}:${l.version}`;
                    }
                });
                if (parsedLibrariesVersion.length > 0) {
                    let success = `\'Cordova Play Services Version Adapter\' plugin has made changes in the following dependencies:\n    - '`;
                    success += `${parsedLibrariesVersion.join(`' => ${newVersion}\n    - '`)}' => ${newVersion}\n`;
                    success += `\nThe library '${dependency}' needs at least version ${version} of 'Google Play Services'`;
                    success += '\nThese changes are necessary since all plugins must use the same version of \'Google Play Services\'';
                    success += '\nOtherwise the application would not compile';
                    process.env.adapterSuccess = success;
                }
            } else {
                const parsedLibrariesVersion = libraries.filter(l => l.isGoogle).map(l => {
                    if (l.isGoogle) {
                        return `${l.package}:${l.dependency}:${l.version}`;
                    }
                });
                error = '\'Cordova Play Services Version Adapter\' plugin detects an error: your application will not compile\n';
                error += 'You have an incompatibility of versions with the following dependencies of \'Google Play Services\':\n    - \'';
                error += `${parsedLibrariesVersion.join('\'\n    - \'')}'\n`;
                error += '\nAll dependencies of \'Google Play Services\' must have the same version';
                error += `\nThe library '${dependency}' needs at least version ${version} of 'Google Play Services'`;
                error += `\nTried to adapt this versions but there is no version of 'Google Play Services' equal to or greater than ${version} that contains all those dependencies together`;
                error += `\nA smaller version can not be applied because the library '${dependency}' needs functionalities that were implemented from the ${version} version`;
                process.env.adapterError = error;
            }
        }
        if (!error) {
            fs.writeFileSync(properties, newLines.join('\n'));
        }
    }
    deferral.resolve();
}

function attempt(fn) {
    return function () {
        try {
            fn.apply(this, arguments);
        } catch (e) {
            console.log("EXCEPTION: " + e.toString());
        }
    }
}

module.exports = function (ctx) {
    deferral = ctx.requireCordovaModule('q').defer();
    if (ctx.cmdLine.indexOf('platform add') === -1) {
        attempt(run)();
    } else {
        deferral.resolve();
    }
    return deferral.promise;
};
