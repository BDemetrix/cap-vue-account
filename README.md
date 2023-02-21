# cap-vue-account

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Окружение для iOS
https://capacitorjs.com/docs/getting-started/environment-setup#homebrew

Возможно понадобится доустановить cocoapods на macOS
`sudo gem install cocoapods`  

затем выполнить 
`npx cap open ios`

Изменить настройки https://capacitorjs.com/docs/v3/ios/configuration#setting-capabilities

Выполнить:
`npx cap sync ios`

Ошибка:
[error] xcode-select: error: tool 'xcodebuild' requires Xcode, but active developer
        directory '/Library/Developer/CommandLineTools' is a command line tools instance

Разрешение: https://github.com/nodejs/node-gyp/issues/569

Установочный файл для iOS лежит в дереве проекта в  App/App/Product/App.app
его необходимо сжать в *.zip и переиновать в *.ipa


### Подключение firebase
1. Открвть консоль firebase и создать проект 
https://console.firebase.google.com/?hl=ru 
2. Добввить и зарегистрировать приложения Android и iOS (и/или другой)

! При подключении сервисов firebase необходимо мышкой перетащить GoogleService-Info.plist из папки с проектом в навигатор Xcode рядом с Info.plist (почему-то Xcode не подхватывает его автоматически)

! При сборке capacitorjs или другим фреймворком НЕ ДОБАВЛЯТЬ в Xcode > File > Add Packages (описано в инструкции по предыдущей ссылке). Добавление приводит к ошибке `Redefinition of module 'Firebase'`

#### Добавление приложения Android
https://console.firebase.google.com/project/cap-vue-account/settings/general/android:com.example.app?hl=ru

#### Добавление приложения iOS
https://console.firebase.google.com/project/cap-vue-account/settings/general/ios:com.example.app?hl=ru
! При сборке capacitorjs или другим фреймворком НЕ ДОБАВЛЯТЬ в Xcode > File > Add Packages (описано в инструкции по предыдущей ссылке). Добавление приводит к ошибке `Redefinition of module 'Firebase'`



### При обновлении проекта из репы лили после внесения изменений 
Если добавлялись/обновлялись пакеты
`npm i`

необходимо выполнить 
`npm run build`
`npx cap sync`


### Аутентификация в firebase из capacitor плагина
https://www.npmjs.com/package/@capacitor-firebase/authentication

### Push-уведомления
https://capacitorjs.com/docs/apis/push-notifications
Выполнить действия
https://i.stack.imgur.com/FbQDL.png

https://firebase.google.com/docs/cloud-messaging?hl=ru


### Вход по биометрии
Capacitor Native Biometric
`npm i capacitor-native-biometric`
https://www.npmjs.com/package/capacitor-native-biometric



#### REST Resource: projects.messages+
Сообщение для отправки облачной службой обмена сообщениями Firebase
https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages?hl=ru


### Ошибки 
1. Redefinition of module 'Firebase' 
https://github.com/invertase/react-native-firebase/issues/6304
https://stackoverflow.com/questions/70760326/flutter-on-ios-redefinition-of-module-firebase
! При сборке capacitorjs или другим фреймворком НЕ ДОБАВЛЯТЬ в Xcode > File > Add Packages (описано в инструкции по предыдущей ссылке). Добавление приводит к ошибке `Redefinition of module 'Firebase'`

2. No valid 'aps-environment' entitlement string found for application on app store
https://fmaxx.github.io/ios/provisioning/2017/08/30/ios-provisioning-part-2.html


### Сертификаты для Apple
https://developer.apple.com/
Здесь написано какие сертификаты бывают и зачем нужны.
Надо их получить.
https://fmaxx.github.io/ios/provisioning/2017/08/20/ios-provisioning-part-1.html
https://fmaxx.github.io/ios/provisioning/2017/08/30/ios-provisioning-part-2.html


