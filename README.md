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


### Аутентификация в firebase из capacitor плагина
https://www.npmjs.com/package/@capacitor-firebase/authentication

### Push 
https://capacitorjs.com/docs/apis/push-notifications

https://firebase.google.com/docs/cloud-messaging?hl=ru
#### REST Resource: projects.messages
https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages?hl=ru#ApnsConfig


