#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const dependencies = require(path.resolve(process.cwd(), 'plugins/cordova-play-services-version-adapter/scripts/dependencies.json'));
const properties = path.resolve(process.cwd(), 'platforms/android/project.properties');
const cordovaLybrary = 'cordova.system.library';
const googleAndroid = 'com.google.android.gms';
const googleFirebase = 'com.google.firebase';
const playServicesAds = 'play-services-ads';
const compatPlgs = ['cordova-admob'];
const libraries = [];

let deferral;
let isCompatible = false;
let hasPlayServicesAds = false;
let minVersion;
let newVersion;

function isAdmobAndCompatible(package, dependency) {
    if (package === googleAndroid && dependency === playServicesAds) {
        hasPlayServicesAds = true;
        if (!isCompatible) {
            return false;
        }
    }
    return true;
}

function getBiggerVersion(v1, v2, idx = 0) {
    const v1Params = v1.split('.');
    const v2Params = v2.split('.');
    if (!isNaN(v1Params[idx]) && !isNaN(v2Params[idx])) {
        if (parseInt(v1Params[idx]) < parseInt(v2Params[idx])) {
            return v2;
        } else if (parseInt(v1Params[idx]) === parseInt(v2Params[idx])) {
            if (idx === v1Params.length - 1) {
                return v1;
            }
            return getBigger(v1, v2, idx + 1);
        }
        return v1;
    } else if (isNaN(v1Params[idx]) && !isNaN(v2Params[idx])) {
        return v2;
    }
    return v1;
}

function prepareLibraries(lines) {
    const newLines = [];
    for (let i = 0, n = lines.length; i < n; i += 1) {
        const line = lines[i];
        if (line.indexOf(cordovaLybrary) > -1) {
            const params = line.split('=');
            const libraryParams = params[1].split(':');
            const package = libraryParams[0];
            const dependency = libraryParams[1];
            const version = libraryParams[2];
            if ((package.indexOf(googleAndroid) > -1 || package.indexOf(googleFirebase) > -1) && isAdmobAndCompatible(package, dependency)) {
                libraries.push({ library: params[0], package, dependency, version, isGoogle: true });
                if (!minVersion) {
                    minVersion = { package, dependency, version };
                } else {
                    const bigger = getBiggerVersion(minVersion.version, version);
                    if (bigger === version) {
                        minVersion = { package, dependency, version: bigger };
                    }
                }
            } else {
                libraries.push({ library: params[0], package, dependency, version, isGoogle: false });
            }
        } else {
            newLines.push(line);
        }
    }
    return newLines;
}

function setNewVersion(version, libraries) {
    if (version.dependencies.filter(d => libraries.indexOf(d) > -1).length === libraries.length) {
        newVersion = version.version;
        return true;
    }
    return false;
}

function prepareNewVersion() {
    let possibleVersions = dependencies.filter(l => getBiggerVersion(l.version, minVersion.version) === l.version);
    const parsedLibraries = libraries.filter(l => l.isGoogle).map(l => `${l.package}:${l.dependency}`);
    if (isNaN(minVersion.version.split('.')[0])) {
        for (let i = possibleVersions.length - 1, n = 0; i >= n; i -= 1) {
            const setted = setNewVersion(possibleVersions[i], parsedLibraries);
            if (setted) {
                break;
            }
        }
    } else {
        for (let i = 0, n = possibleVersions.length; i < n; i += 1) {
            const setted = setNewVersion(possibleVersions[i], parsedLibraries);
            if (setted) {
                break;
            }
        }
    }
    if (!newVersion) {
        const parentVersion = `${minVersion.version.split('.')[0]}.0.0`;
        possibleVersions = dependencies.filter(l => l.version >= parentVersion && l.version < minVersion.version);
        for (let i = possibleVersions.length - 1, n = 0; i >= n; i -= 1) {
            const setted = setNewVersion(possibleVersions[i], parsedLibraries);
            if (setted) {
                break;
            }
        }
    }
}

function prepareSuccess(libraries, version) {
    let success = `\'Cordova Play Services Version Adapter\' has successfully applied the following changes:\n    - '`;
    success += `${libraries.join(`' => ${version}\n    - '`)}' => ${version}`;
    process.env.adapterSuccess = success;
}

function prepareWarning() {
    let warning = '';
    if (hasPlayServicesAds) {
        warning += 'WARNING: some plugins are using \'com.google.android.gms:play-services-ads\''
        warning += '\nIt is not possible to find the required version of \'Google Play Services\' Ads library.';
        warning += `\n\nUse 'cordova-admob' to monetize with AdMob`;
    } else if (!hasPlayServicesAds) {
        warning += 'Monetize your app with AdMob ads. Now available with this cordova / phonegap plugin:';
    }
    warning += '\ncordova plugin add cordova-admob';
    warning += '\nDocs: https://github.com/appfeel/admob-google-cordova';
    process.env.adapterWarning = warning;
}

function prepareError(libraries) {
    let error;
    error = '\'Cordova Play Services Version Adapter\' has detected an error. The following dependencies of \'Google Play Services\' are not compatible:\n';
    error += 'You have an incompatibility of versions with the following dependencies of \'Google Play Services\':\n    - \'';
    error += `${libraries.join('\'\n    - \'')}'\n`;
    error += '\nIt doesn\'t exists a version of \'Google Play Services\' that includes all these dependencies.';
    error += `\nAll dependencies of 'Google Play Services' must have the same version.`;
    error += `\nThe application may not compile.`;
    process.env.adapterError = error;
}

function run() {
    const data = fs.readFileSync(properties, 'utf8');
    if (data) {
        const newLines = prepareLibraries(data.split('\n'));
        if (libraries.filter(l => l.isGoogle).length > 1) {
            prepareNewVersion();
            if (newVersion) {
                for (let i = 0, n = libraries.length; i < n; i += 1) {
                    const library = libraries[i];
                    const libraryVersion = library.isGoogle ? newVersion : library.version;
                    newLines.push(`${library.library}=${library.package}:${library.dependency}:${libraryVersion}`);
                }
                const parsedLibrariesVersion = libraries.filter(l => l.isGoogle && l.version !== newVersion).map(l => `${l.package}:${l.dependency}:${l.version}`);
                if (parsedLibrariesVersion.length > 0) {
                    prepareSuccess(parsedLibrariesVersion, newVersion);
                }
            } else {
                const parsedLibrariesVersion = libraries.filter(l => l.isGoogle).map(l => `${l.package}:${l.dependency}:${l.version}`);
                prepareError(parsedLibrariesVersion);
            }
        }
        if (!isCompatible) {
            prepareWarning();
        }
        if (newVersion) {
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
        isCompatible = ctx.opts.cordova.plugins.find(p => compatPlgs.indexOf(p) > -1);
        attempt(run)();
    } else {
        deferral.resolve();
    }
    return deferral.promise;
};
