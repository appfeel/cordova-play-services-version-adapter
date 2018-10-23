*<p style="font-size: small;" align="right"><a style="color:#232323" color="#232323" href="http://appfeel.com">Made in Barcelona with <span color="#FCB">Love</span> and <span color="#BBCCFF">Code</span></a></p>*

Cordova Google Play Services / Firebase versions adapter
================================================

Many plugins use Google Play Services or Firebase and some of them are stick to a concrete version:

- [Cordova plugin Admob](https://github.com/appfeel/admob-google-cordova) latest
- [Google analytics plugin](https://github.com/appfeel/analytics-google) latest
- [Phonegap plugin push](https://github.com/phonegap/phonegap-plugin-push) 11.6.2
- [Google maps](https://github.com/mapsplugin/cordova-plugin-googlemaps) 15.0.1

When some or all of these plugins are used together, this may cause incompatibilities and the application will fail to build (see issues in https://github.com/appfeel/admob-google-cordova/issues/97, https://github.com/phonegap/phonegap-plugin-push/issues/2511, https://github.com/phonegap/phonegap-plugin-push/issues/2360).

This is because all plugins that use Google Play Services in an application must be using the same version. It's also not possible to decrease the version of Google Play Services because there may be unnimplemented features in lower versions that are required by the plugin.

This plugin will analyze all libraries being used by the application, see which is the version that most of them are compatible with and align the versions. All of this is done transparently, so the developer doesn't need to take care on which is the Google Play Services version that will compatibilize the different plugins. So it allows to add many different plugins using different Google Play Services without worrying anymore about the different Google Play Services library versions mess.

Simply install this plugin and it will take care of optimizing the versions of Google Play Services at prepare, compile or run time.

---
## Quick start ##

To install this plugin, read the [Command-line Interface Guide](http://cordova.apache.org/docs/en/edge/guide_cli_index.md.html#The%20Command-line%20Interface) and use one of the following command lines:

* `cordova plugin add cordova-play-services-version-adapter`
* `ionic cordova plugin add cordova-play-services-version-adapter`

---
## How it works ##

As soon as the application compiles, all versions of Google Play Services plugins are automatically aligned, showing up a final report about compatibilization changes carried out.


#### Success example:
```
'Cordova Play Services Version Adapter' plugin has made changes in the following dependencies:
    - 'com.google.android.gms:play-services-analytics:+' => 15.0.0
    - 'com.google.android.gms:play-services-maps:15.0.1' => 15.0.0
    - 'com.google.android.gms:play-services-location:15.0.1' => 15.0.0
    - 'com.google.firebase:firebase-messaging:11.6.2' => 15.0.0

The library 'com.google.android.gms:play-services-location' needs at least version 15 of 'Google Play Services'
These changes are necessary since all plugins must use the same version of 'Google Play Services'
Otherwise the application would not compile
```

#### Error example:
```
'Cordova Play Services Version Adapter' plugin detects an error: your application will not compile
You have an incompatibility of versions with the following dependencies of 'Google Play Services':
    - 'com.google.android.gms:play-services-ads:17.0.0'
    - 'com.google.android.gms:play-services-analytics:+'
    - 'com.google.android.gms:play-services-maps:15.0.1'
    - 'com.google.android.gms:play-services-location:15.0.1'
    - 'com.google.firebase:firebase-messaging:11.6.2'

All dependencies of 'Google Play Services' must have the same version
The library 'com.google.android.gms:play-services-ads' needs at least version 17 of 'Google Play Services'
Tried to adapt this versions but there is no version of 'Google Play Services' equal to or greater than 17 that contains all those dependencies together
A smaller version can not be applied because the library 'com.google.android.gms:play-services-ads' needs functionalities that were implemented from the 17 version
```

---
## Other plugins you may be interested on

- [Ionic/Cordova Admob monetization](https://github.com/appfeel/admob-google-cordova)
- [Ionic/Cordova In app purchase]()
- [Ionic/Cordova Google Analytics](https://github.com/appfeel/analytics-google)

---
## Credits ##

* [appFeel](http://www.appfeel.com)

---
## License ##
```
The MIT License

Copyright (c) 2018 AppFeel

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
