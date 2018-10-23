Cordova Play Services Versions Incompatibility Adapter plugin
================================================

Adapt versions of Google Play Services that use the plugins of your application automatically so that the developer does not have to worry anymore.
Simply install this plugin in your application, and when you run, compile or prepare the app we take care of optimizing your versions of Google Play Services without you having to stop to think about it for a second

---
## Quick start ##

To install this plugin, follow the [Command-line Interface Guide](http://cordova.apache.org/docs/en/edge/guide_cli_index.md.html#The%20Command-line%20Interface). You can use one of the following command lines:

* `cordova plugin add cordova-admob`
* `cordova plugin add https://github.com/appfeel/admob-google-cordova.git`

---
## Harmonization ##

As soon as the application compiles, all the versions of your Google Play Services plugins are automatically adapted informing you at all times of the changes made.

All plugins that use Google Play Services in an application must use the same version, you can not decrease the version of Google Play Services from a library because there may be features that did not exist in that version, in case there is no version of Google Play Services compatible with all your plugins together we inform you in detail about the error

---
## User console communication on build ##

Success example:
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

Error example:
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

---
## Credits ##

* [appFeel](http://www.appfeel.com)
