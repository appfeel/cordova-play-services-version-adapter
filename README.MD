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
ANDROID_HOME=/home/dsilvestre/Android/Sdk
[cordova]  JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
[cordova]  studio
[cordova]  Subproject Path: CordovaLib
[cordova]  Subproject Path: app
[cordova]  publishNonDefault is deprecated and has no effect anymore. All variants are now published.
[app-scripts] [18:08:57]  lint finished in 4.21 s
[cordova]  Configuration 'compile' in project ':app' is deprecated. Use 'implementation' instead.
[cordova]  The Task.leftShift(Closure) method has been deprecated and is scheduled to be removed in Gradle 5.0. Please use Task.doLast(Action) instead.
[cordova]       at build_3g9qinz1solofeyuiw1btga2e.run(/home/dsilvestre/Projects/admob-plugin/my-app/platforms/android/app/build.gradle:146)
[cordova]
[cordova]  FAILURE: Build failed with an exception.
[cordova]
[cordova]  * Where:
[cordova]  Script '/home/dsilvestre/Projects/admob-plugin/my-app/platforms/android/cordova-support-google-services/dev-build.gradle' line: 16
[cordova]
[cordova]  * What went wrong:
[cordova]  A problem occurred evaluating project ':app'.
[cordova]  > Failed to apply plugin [class 'com.google.gms.googleservices.GoogleServicesPlugin']
[cordova]     > All firebase libraries must be either above or below 14.0.0
[cordova]
[cordova]  * Try:
[cordova]  Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output.
[cordova]
[cordova]  * Get more help at https://help.gradle.org
[cordova]
[cordova]  BUILD FAILED in 1s
[cordova]  (node:14071) UnhandledPromiseRejectionWarning: Error: /home/dsilvestre/Projects/admob-plugin/my-app/platforms/android/gradlew: Command failed with exit code 1Error output:
[cordova]  FAILURE: Build failed with an exception.
[cordova]
[cordova]  * Where:
[cordova]  Script '/home/dsilvestre/Projects/admob-plugin/my-app/platforms/android/cordova-support-google-services/dev-build.gradle' line: 16
[cordova]
[cordova]  * What went wrong:
[cordova]  A problem occurred evaluating project ':app'.
[cordova]  > Failed to apply plugin [class 'com.google.gms.googleservices.GoogleServicesPlugin']
[cordova]     > All firebase libraries must be either above or below 14.0.0
[cordova]
[cordova]  * Try:
[cordova]  Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output.
[cordova]
[cordova]  * Get more help at https://help.gradle.org
[cordova]
[cordova]  BUILD FAILED in 1s
[cordova]      at ChildProcess.whenDone (/home/dsilvestre/Projects/admob-plugin/my-app/platforms/android/cordova/node_modules/cordova-common/src/superspawn.js:169:23)
[cordova]      at emitTwo (events.js:126:13)
[cordova]      at ChildProcess.emit (events.js:214:7)
[cordova]      at maybeClose (internal/child_process.js:925:16)
[cordova]      at Process.ChildProcess._handle.onexit (internal/child_process.js:209:5)
[cordova]  (node:14071) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
[cordova]  (node:14071) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
---
[cordova]
[cordova]  ANDROID_HOME=/home/dsilvestre/Android/Sdk
[cordova]  JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
[cordova]  studio
[cordova]  Subproject Path: CordovaLib
[cordova]  Subproject Path: app
[cordova]  publishNonDefault is deprecated and has no effect anymore. All variants are now published.
[app-scripts] [18:12:36]  lint finished in 3.63 s
[cordova]  The Task.leftShift(Closure) method has been deprecated and is scheduled to be removed in Gradle 5.0. Please use Task.doLast(Action) instead.
[cordova]       at build_3g9qinz1solofeyuiw1btga2e.run(/home/dsilvestre/Projects/admob-plugin/my-app/platforms/android/app/build.gradle:145)
[cordova]  Configuration 'compile' in project ':app' is deprecated. Use 'implementation' instead.
[cordova]
[cordova]  FAILURE: Build failed with an exception.
[cordova]
[cordova]  * Where:
[cordova]  Script '/home/dsilvestre/Projects/admob-plugin/my-app/platforms/android/cordova-support-google-services/dev-build.gradle' line: 16
[cordova]
[cordova]  * What went wrong:
[cordova]  A problem occurred evaluating project ':app'.
[cordova]  > Failed to apply plugin [class 'com.google.gms.googleservices.GoogleServicesPlugin']
[cordova]     > Version: 6.8.0 is lower than the minimum version (9.0.0) required for google-services plugin.
[cordova]
[cordova]  * Try:
[cordova]  Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output.
[cordova]
[cordova]  * Get more help at https://help.gradle.org
[cordova]
[cordova]  BUILD FAILED in 2s
[cordova]  (node:14939) UnhandledPromiseRejectionWarning: Error: /home/dsilvestre/Projects/admob-plugin/my-app/platforms/android/gradlew: Command failed with exit code 1Error output:
[cordova]  FAILURE: Build failed with an exception.
[cordova]
[cordova]  * Where:
[cordova]  Script '/home/dsilvestre/Projects/admob-plugin/my-app/platforms/android/cordova-support-google-services/dev-build.gradle' line: 16
[cordova]
[cordova]  * What went wrong:
[cordova]  A problem occurred evaluating project ':app'.
[cordova]  > Failed to apply plugin [class 'com.google.gms.googleservices.GoogleServicesPlugin']
[cordova]     > Version: 6.8.0 is lower than the minimum version (9.0.0) required for google-services plugin.
[cordova]
[cordova]  * Try:
[cordova]  Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output.
[cordova]
[cordova]  * Get more help at https://help.gradle.org
[cordova]
[cordova]  BUILD FAILED in 2s
[cordova]      at ChildProcess.whenDone (/home/dsilvestre/Projects/admob-plugin/my-app/platforms/android/cordova/node_modules/cordova-common/src/superspawn.js:169:23)
[cordova]      at emitTwo (events.js:126:13)
[cordova]      at ChildProcess.emit (events.js:214:7)
[cordova]      at maybeClose (internal/child_process.js:925:16)
[cordova]      at Process.ChildProcess._handle.onexit (internal/child_process.js:209:5)
[cordova]  (node:14939) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
[cordova]  (node:14939) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
---
ANDROID_HOME=/home/dsilvestre/Android/Sdk
[cordova]  JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
[cordova]  studio
[cordova]  Subproject Path: CordovaLib
[cordova]  Subproject Path: app
[cordova]  publishNonDefault is deprecated and has no effect anymore. All variants are now published.
[app-scripts] [18:13:59]  lint finished in 3.79 s
[cordova]  The Task.leftShift(Closure) method has been deprecated and is scheduled to be removed in Gradle 5.0. Please use Task.doLast(Action) instead.
[cordova]       at build_3g9qinz1solofeyuiw1btga2e.run(/home/dsilvestre/Projects/admob-plugin/my-app/platforms/android/app/build.gradle:145)
[cordova]  Configuration 'compile' in project ':app' is deprecated. Use 'implementation' instead.
[cordova]  Could not find google-services.json while looking in [src/nullnull/debug, src/debug/nullnull, src/nullnull, src/debug, src/nullnullDebug]
[cordova]  registerResGeneratingTask is deprecated, use registerGeneratedFolders(FileCollection)
[cordova]  Could not find google-services.json while looking in [src/nullnull/release, src/release/nullnull, src/nullnull, src/release, src/nullnullRelease]
[cordova]  registerResGeneratingTask is deprecated, use registerGeneratedFolders(FileCollection)
[cordova]  :CordovaLib:preBuild UP-TO-DATE
[cordova]  :CordovaLib:preDebugBuild UP-TO-DATE
[cordova]  :CordovaLib:compileDebugAidl UP-TO-DATE
[cordova]  :CordovaLib:compileDebugRenderscript UP-TO-DATE
[cordova]  :CordovaLib:checkDebugManifest UP-TO-DATE
[cordova]  :CordovaLib:generateDebugBuildConfig UP-TO-DATE
[cordova]  :CordovaLib:prepareLintJar UP-TO-DATE
[cordova]  :CordovaLib:generateDebugResValues UP-TO-DATE
[cordova]  :CordovaLib:generateDebugResources UP-TO-DATE
[cordova]  :CordovaLib:packageDebugResources UP-TO-DATE
[cordova]  :CordovaLib:platformAttrExtractor UP-TO-DATE
[cordova]  :CordovaLib:processDebugManifest UP-TO-DATE
[cordova]  :CordovaLib:processDebugResources
[cordova]  :CordovaLib:generateDebugSources
[cordova]  :CordovaLib:javaPreCompileDebug UP-TO-DATE
[cordova]  Note: Some input files use or override a deprecated API.
[cordova]  Note: Recompile with -Xlint:deprecation for details.
[cordova]  :CordovaLib:compileDebugJavaWithJavac
[cordova]  :CordovaLib:processDebugJavaRes NO-SOURCE
[cordova]  :CordovaLib:transformClassesAndResourcesWithPrepareIntermediateJarsForDebug
[cordova]  :app:preBuild UP-TO-DATE
[cordova]  :app:preDebugBuild
[cordova]  :app:compileDebugAidl
[cordova]  :CordovaLib:packageDebugRenderscript NO-SOURCE
[cordova]  :app:compileDebugRenderscript
[cordova]  :app:checkDebugManifest
[cordova]  :app:generateDebugBuildConfig
[cordova]  :app:prepareLintJar
[cordova]  :app:generateDebugResValues
[cordova]  :app:generateDebugResources
[cordova]  :app:processDebugGoogleServices
[cordova]  Parsing json file: /home/dsilvestre/Projects/admob-plugin/my-app/platforms/android/app/google-services.json
[cordova]  :app:mergeDebugResources
[cordova]  :app:createDebugCompatibleScreenManifests
[cordova]  :app:processDebugManifest
[cordova]  :app:splitsDiscoveryTaskDebug
[cordova]  :app:processDebugResources
[cordova]  :app:generateDebugSources
[cordova]  :app:javaPreCompileDebug
[cordova]  Note: Some input files use or override a deprecated API.
[cordova]  Note: Recompile with -Xlint:deprecation for details.
[cordova]  Note: /home/dsilvestre/Projects/admob-plugin/my-app/platforms/android/app/src/main/java/com/adobe/phonegap/push/PushPlugin.java uses unchecked or unsafe operations.
[cordova]  Note: Recompile with -Xlint:unchecked for details.
[cordova]  :app:compileDebugJavaWithJavac
[cordova]  :app:compileDebugNdk NO-SOURCE
[cordova]  :app:compileDebugSources
[cordova]  :CordovaLib:mergeDebugShaders
[cordova]  :CordovaLib:compileDebugShaders
[cordova]  :CordovaLib:generateDebugAssets
[cordova]  :CordovaLib:mergeDebugAssets
[cordova]  :app:mergeDebugShaders
[cordova]  :app:compileDebugShaders
[cordova]  :app:generateDebugAssets
[cordova]  :app:mergeDebugAssets
[cordova]  :app:transformClassesWithStackFramesFixerForDebug
[cordova]  :app:transformClassesWithDesugarForDebug
[cordova]  :app:transformClassesWithDexBuilderForDebug
[cordova]  :app:transformClassesWithMultidexlistForDebug
[cordova]  Dex: Error converting bytecode to dex:
[cordova]  Cause: com.android.dex.DexException: Multiple dex files define Lcom/google/android/gms/internal/zzez;
[cordova]      UNEXPECTED TOP-LEVEL EXCEPTION:
[cordova]      com.android.dex.DexException: Multiple dex files define Lcom/google/android/gms/internal/zzez;
[cordova]
[cordova]  com.android.dex.DexException: Multiple dex files define Lcom/google/android/gms/internal/zzez;
[cordova]       at com.android.dx.merge.DexMerger.readSortableTypes(DexMerger.java:661)
[cordova]       at com.android.dx.merge.DexMerger.getSortedTypes(DexMerger.java:616)
[cordova]       at com.android.dx.merge.DexMerger.mergeClassDefs(DexMerger.java:598)
[cordova]       at com.android.dx.merge.DexMerger.mergeDexes(DexMerger.java:171)
[cordova]       at com.android.dx.merge.DexMerger.merge(DexMerger.java:198)
[cordova]       at com.android.builder.dexing.DexArchiveMergerCallable.call(DexArchiveMergerCallable.java:61)
[cordova]       at com.android.builder.dexing.DexArchiveMergerCallable.call(DexArchiveMergerCallable.java:36)
[cordova]       at java.util.concurrent.ForkJoinTask$AdaptedCallable.exec(ForkJoinTask.java:1424)
[cordova]       at java.util.concurrent.ForkJoinTask.doExec(ForkJoinTask.java:289)
[cordova]       at java.util.concurrent.ForkJoinPool$WorkQueue.runTask(ForkJoinPool.java:1056)
[cordova]       at java.util.concurrent.ForkJoinPool.runWorker(ForkJoinPool.java:1692)
[cordova]       at java.util.concurrent.ForkJoinWorkerThread.run(ForkJoinWorkerThread.java:157)
[cordova]
[cordova]  FAILURE: Build failed with an exception.
[cordova]
[cordova]  * What went wrong:
[cordova]  Execution failed for task ':app:transformDexArchiveWithDexMergerForDebug'.
[cordova]  > com.android.build.api.transform.TransformException: com.android.dex.DexException: Multiple dex files define Lcom/google/android/gms/internal/zzez;
[cordova]
[cordova]  * Try:
[cordova]  Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output.
[cordova]
[cordova]  * Get more help at https://help.gradle.org
[cordova]
[cordova]  BUILD FAILED in 43s
[cordova]  :app:transformDexArchiveWithDexMergerForDebug FAILED
[cordova]  39 actionable tasks: 29 executed, 10 up-to-date
[cordova]  (node:15297) UnhandledPromiseRejectionWarning: Error: /home/dsilvestre/Projects/admob-plugin/my-app/platforms/android/gradlew: Command failed with exit code 1Error output:
[cordova]  Note: Some input files use or override a deprecated API.
[cordova]  Note: Recompile with -Xlint:deprecation for details.
[cordova]  Note: Some input files use or override a deprecated API.
[cordova]  Note: Recompile with -Xlint:deprecation for details.
[cordova]  Note: /home/dsilvestre/Projects/admob-plugin/my-app/platforms/android/app/src/main/java/com/adobe/phonegap/push/PushPlugin.java uses unchecked or unsafe operations.
[cordova]  Note: Recompile with -Xlint:unchecked for details.
[cordova]  Dex: Error converting bytecode to dex:
[cordova]  Cause: com.android.dex.DexException: Multiple dex files define Lcom/google/android/gms/internal/zzez;
[cordova]      UNEXPECTED TOP-LEVEL EXCEPTION:
[cordova]      com.android.dex.DexException: Multiple dex files define Lcom/google/android/gms/internal/zzez;
[cordova]
[cordova]  com.android.dex.DexException: Multiple dex files define Lcom/google/android/gms/internal/zzez;
[cordova]       at com.android.dx.merge.DexMerger.readSortableTypes(DexMerger.java:661)
[cordova]       at com.android.dx.merge.DexMerger.getSortedTypes(DexMerger.java:616)
[cordova]       at com.android.dx.merge.DexMerger.mergeClassDefs(DexMerger.java:598)
[cordova]       at com.android.dx.merge.DexMerger.mergeDexes(DexMerger.java:171)
[cordova]       at com.android.dx.merge.DexMerger.merge(DexMerger.java:198)
[cordova]       at com.android.builder.dexing.DexArchiveMergerCallable.call(DexArchiveMergerCallable.java:61)
[cordova]       at com.android.builder.dexing.DexArchiveMergerCallable.call(DexArchiveMergerCallable.java:36)
[cordova]       at java.util.concurrent.ForkJoinTask$AdaptedCallable.exec(ForkJoinTask.java:1424)
[cordova]       at java.util.concurrent.ForkJoinTask.doExec(ForkJoinTask.java:289)
[cordova]       at java.util.concurrent.ForkJoinPool$WorkQueue.runTask(ForkJoinPool.java:1056)
[cordova]       at java.util.concurrent.ForkJoinPool.runWorker(ForkJoinPool.java:1692)
[cordova]       at java.util.concurrent.ForkJoinWorkerThread.run(ForkJoinWorkerThread.java:157)
[cordova]
[cordova]  FAILURE: Build failed with an exception.
[cordova]
[cordova]  * What went wrong:
[cordova]  Execution failed for task ':app:transformDexArchiveWithDexMergerForDebug'.
[cordova]  > com.android.build.api.transform.TransformException: com.android.dex.DexException: Multiple dex files define Lcom/google/android/gms/internal/zzez;
[cordova]
[cordova]  * Try:
[cordova]  Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output.
[cordova]
[cordova]  * Get more help at https://help.gradle.org
[cordova]
[cordova]  BUILD FAILED in 43s
[cordova]      at ChildProcess.whenDone (/home/dsilvestre/Projects/admob-plugin/my-app/platforms/android/cordova/node_modules/cordova-common/src/superspawn.js:169:23)
[cordova]      at emitTwo (events.js:126:13)
[cordova]      at ChildProcess.emit (events.js:214:7)
[cordova]      at maybeClose (internal/child_process.js:925:16)
[cordova]      at Process.ChildProcess._handle.onexit (internal/child_process.js:209:5)
[cordova]  (node:15297) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
[cordova]  (node:15297) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
---
ANDROID_HOME=/home/dsilvestre/Android/Sdk
[cordova]  JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
[cordova]  studio
[cordova]  Starting a Gradle Daemon (subsequent builds will be faster)
[app-scripts] [18:17:09]  lint finished in 3.35 s
[cordova]  :wrapper
[cordova]
[cordova]  BUILD SUCCESSFUL
[cordova]
[cordova]  Total time: 4.62 secs
[cordova]  Subproject Path: CordovaLib
[cordova]  Subproject Path: app
[cordova]  publishNonDefault is deprecated and has no effect anymore. All variants are now published.
[cordova]  The Task.leftShift(Closure) method has been deprecated and is scheduled to be removed in Gradle 5.0. Please use Task.doLast(Action) instead.
[cordova]       at build_3g9qinz1solofeyuiw1btga2e.run(/home/dsilvestre/Projects/admob-plugin/my-app/platforms/android/app/build.gradle:145)
[cordova]  Configuration 'compile' in project ':app' is deprecated. Use 'implementation' instead.
[cordova]
[cordova]  FAILURE: Build failed with an exception.
[cordova]
[cordova]  * Where:
[cordova]  Script '/home/dsilvestre/Projects/admob-plugin/my-app/platforms/android/cordova-support-google-services/dev-build.gradle' line: 16
[cordova]
[cordova]  * What went wrong:
[cordova]  A problem occurred evaluating project ':app'.
[cordova]  > Failed to apply plugin [class 'com.google.gms.googleservices.GoogleServicesPlugin']
[cordova]     > For input string: "+"
[cordova]
[cordova]  * Try:
[cordova]  Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output.
[cordova]
[cordova]  * Get more help at https://help.gradle.org
[cordova]
[cordova]  BUILD FAILED in 1s
[cordova]  (node:15968) UnhandledPromiseRejectionWarning: Error: /home/dsilvestre/Projects/admob-plugin/my-app/platforms/android/gradlew: Command failed with exit code 1Error output:
[cordova]  FAILURE: Build failed with an exception.
[cordova]
[cordova]  * Where:
[cordova]  Script '/home/dsilvestre/Projects/admob-plugin/my-app/platforms/android/cordova-support-google-services/dev-build.gradle' line: 16
[cordova]
[cordova]  * What went wrong:
[cordova]  A problem occurred evaluating project ':app'.
[cordova]  > Failed to apply plugin [class 'com.google.gms.googleservices.GoogleServicesPlugin']
[cordova]     > For input string: "+"
[cordova]
[cordova]  * Try:
[cordova]  Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output.
[cordova]
[cordova]  * Get more help at https://help.gradle.org
[cordova]
[cordova]  BUILD FAILED in 1s
[cordova]      at ChildProcess.whenDone (/home/dsilvestre/Projects/admob-plugin/my-app/platforms/android/cordova/node_modules/cordova-common/src/superspawn.js:169:23)
[cordova]      at emitTwo (events.js:126:13)
[cordova]      at ChildProcess.emit (events.js:214:7)
[cordova]      at maybeClose (internal/child_process.js:925:16)
[cordova]      at Process.ChildProcess._handle.onexit (internal/child_process.js:209:5)
[cordova]  (node:15968) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
[cordova]  (node:15968) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
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
