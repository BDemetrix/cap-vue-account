# cap-vue-account

## Установка проекта
Скачать репозиторий
```
git clone https://github.com/BDemetrix/cap-vue-account.git
```
Открыть терминал в папке cap-vue-account
```
cd cap-vue-account
```
Выполнить установку
```
npm install
```

### Компиляция и "горячая" перезаргузка для разработки
```
npm run serve
```

### Компилирует и минимизирует для продакшена
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Компиляция для Android и iOS
После внесени изменений в проект выполнить
```
npm run build
npx cap sync
```
И открыть необходимую IDE (Android Studio или Xcode)
```
npx cap open android
```
или
```
npx cap open ios
```


### Среда разработки для Android (тестировать на устройстве)
Для разработки следуетс установить SDK Tools
Tools > SDK Manager or click SDK Manager
https://developer.android.com/studio/intro/update#sdk-manager
https://developer.android.com/studio/releases/platform-tools#downloads

Подключение к устройству по USB или Wi-Fi  
https://developer.android.com/studio/command-line/adb  
https://www.youtube.com/watch?v=JTHhqfooUuM  
Необходимо разрешить отладку и установку

Если не находятся команды в командной строке, надо добавить системные переменные  
PATH: C:/Users/Android/Sdk/tools;C:/Users/Android/Sdk/platform-tools

How To Fix ‘INSTALL_FAILED_USER_RESTRICTED’ On Xiaomi Phones (Android Studio)  
https://www.nucleiotechnologies.com/how-to-fix-install_failed_user_restricted-on-xiaomi-devices-android-studio/

Чтобы создать установочный файл надо воспользоваться пунктом меню Build  
Готовый *.apk лежит здесь:  
android/app/build/outputs/apk/debug/

![image](https://user-images.githubusercontent.com/64604742/222429893-91f8c5f1-b7f8-4628-bed2-c55ea5939f96.png)



### Среда разработки для iOS
https://capacitorjs.com/docs/getting-started/environment-setup#homebrew

Возможно понадобится доустановить cocoapods на macOS
```sudo gem install cocoapods```  

затем выполнить 
```npx cap open ios```

Изменить настройки https://capacitorjs.com/docs/v3/ios/configuration#setting-capabilities

Выполнить:
```npx cap sync ios```

Ошибка:
[error] xcode-select: error: tool 'xcodebuild' requires Xcode, but active developer
        directory '/Library/Developer/CommandLineTools' is a command line tools instance

Разрешение: https://github.com/nodejs/node-gyp/issues/569



### Тестировать приложение на реальном iPhone
https://www.youtube.com/watch?v=e3svWl96dj0

Файл для установки лежит в инспекторе файлов (дерево проекта) Xcode 
в ProjectName/Products/ProjectName.app
Пример: App/Product/App.app
Кликнуть по нему праввой кнопкой, выбрать Show File Inspector, скопировать в другую директорию, сжать в zip, изменить расширение в ipa
Файл *.ipa можно установить на iPhone


### Решение проблемы с интерфейсом VS Code на macOS
Добввить переменную среды PATH для VS Code
https://habr.com/ru/company/microsoft/blog/262523/
Для MacOS
```code () { VSCODE_CWD="$PWD" open -n -b "com.microsoft.VSCode" --args $* ;}```

если графическая оболочка VS Code кривая необходимо вполнить в терминале 
```code --disable-gpu```
Затем зайти в настройки VS Code и:
Open the Command Palette (⇧⌘P).
Run the Preferences: Configure Runtime Arguments command.
This command will open a argv.json file to configure runtime arguments. You might see some default arguments there already.
Add "disable-hardware-acceleration": true.
Restart VS Code.



### Подключение firebase
1. Открвть консоль firebase и создать проект 
https://console.firebase.google.com/?hl=ru 
2. Добввить и зарегистрировать приложения Android и iOS (и/или другой)

! При подключении сервисов firebase необходимо мышкой перетащить GoogleService-Info.plist из папки с проектом в навигатор Xcode рядом с Info.plist (почему-то Xcode не подхватывает его автоматически)

! При сборке capacitorjs или другим фреймворком НЕ ДОБАВЛЯТЬ в Xcode > File > Add Packages (описано в инструкции по предыдущей ссылке). Добавление приводит к ошибке `Redefinition of module 'Firebase'`

#### Добавление приложения Android в firebase
https://console.firebase.google.com/project/cap-vue-account/settings/general/android:com.example.app?hl=ru

#### Добавление приложения iOS в firebase
https://console.firebase.google.com/project/cap-vue-account/settings/general/ios:com.example.app?hl=ru
! При сборке capacitorjs или другим фреймворком НЕ ДОБАВЛЯТЬ в Xcode > File > Add Packages (описано в инструкции по предыдущей ссылке). Добавление приводит к ошибке `Redefinition of module 'Firebase'`

! Для отправления пушей через firebase для устройств Apple  
необходимо получение ключа (APNs Authentication Key) и сертификатов (APNs Certificates) 
и добавление их в консоль firebase


### При обновлении проекта из репы или после внесения изменений 
Если добавлялись/обновлялись пакеты (видно по изменениям в package.json)  
```npm i```

необходимо выполнить   
```npm run build```  
```npx cap sync```



### Аутентификация в firebase из capacitor плагина
https://www.npmjs.com/package/@capacitor-firebase/authentication
! ошибка возвращается в виде пустонго объекта `{}`


### Push-уведомления 
https://capacitorjs.com/docs/apis/push-notifications
Выполнить действия
https://i.stack.imgur.com/FbQDL.png

https://firebase.google.com/docs/cloud-messaging?hl=ru  

Настройка доступов для отправления пушей осуществляется в консоли firebase  
Project settings -> Cloud Messaging

! Для отправления пушей через firebase для устройств Apple  
необходимо получение ключа (APNs Authentication Key) и сертификатов (APNs Certificates) 
и добавление их в консоль firebase



### Вход по биометрии
Capacitor Native Biometric  
```npm i capacitor-native-biometric```  
https://www.npmjs.com/package/capacitor-native-biometric



### REST Resource для отправки пушей с сервера через firebase
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

### Релиз в App Store
https://habr.com/ru/company/touchinstinct/blog/341858/
https://habr.com/ru/company/touchinstinct/blog/345336/

### Публикация приложения в Google Play
https://www.youtube.com/watch?v=q7NFn2Wfwxc
https://habr.com/ru/company/livetyping/blog/326874/


### RuStore
RuStore - одна из альтернатив Google Play от VK  
https://help.rustore.ru/rustore/for_developers/publishing_and_verifying_apps/account


## Создание нового проекта

### 1. Установить vue
https://v3.ru.vuejs.org/ru/guide/installation.html#cli

```npm install -g @vue/cli```  
```vue create <project-name>```
```
Ручная настройка
 ◉ Babel
 ◉ Router
 ◉ Vuex
 ◉ CSS Pre-processors
 ◉ Linter / Formatter
```
Use history mode for router? Y

### 2. Подключение стилей 
 В main.js: ```import '@/assets/scss/style.scss'```

 Желательно хранить стили компонентоа в отдельных файлах 
 и подключать их в style.scss через @import


### 3. Настройка PWA во Vue (при необходимости) 
https://cli.vuejs.org/core-plugins/pwa.html
https://webdevblog.ru/sozdanie-pwa-s-pomoshhju-vue-js/
Чтобы переопределить значения по умолчанию в манифесте нашего веб-приложения, нужно настроить файл vue.config.js в корне нашего проекта.

Если вы хотите превратить существующий проект Vue в PWA, для этого можно легко установить плагин самостоятельно. Команда для установки плагина PWA (при условии, что у вас уже установлен Vue CLI):  
```vue add pwa```

Добавляемый этим плагином service worker включается только в production окружении.  
При необходимости протестировать service worker локально, соберите приложение и запустите простой HTTP-сервер из каталога сборки. Рекомендуется использовать браузер в инкогнито-режиме для избежания осложнений с кэшем вашего браузера.
Для работы в браузере на локальном HTTP-сервере надо добавить flag  
chrome://flags/#unsafely-treat-insecure-origin-as-secure  
для url, на котором сервер открывает приложение.  
Пример: http://10.0.3.10:8003


Для запуска на локальном сервере эта команда будет запустить оба процесса в одной строке:  
```npm run build && npx http-server dist```


### 4. Для PWA или/и гибридного приложения сгенерировать и заменить иконки
<details><summary>Список иконок в /public/img/icons/</summary>

        1. android-chrome-192x192.png
        1. android-chrome-512x512.png
        1. android-chrome-maskable-192x192.png
        1. android-chrome-maskable-512x512.png
        1. apple-touch-icon-60x60.png
        1. apple-touch-icon-76x76.png
        1. apple-touch-icon-120x120.png
        1. apple-touch-icon-152x152.png
        1. apple-touch-icon-180x180.png
        1. apple-touch-icon.png
        1. favicon-16x16.png
        1. favicon-32x32.png
        1. msapplication-icon-144x144.png
        1. mstile-150x150.png
        1. safari-pinned-tab.svg

</details>


### 5. Установить для Vue https://capacitorjs.com/solution/vue согласно инструкциям:

```npm install @capacitor/cli @capacitor/core```  
```npx cap init```

```npm install @capacitor/ios @capacitor/android```  
```npx cap add ios```  
```npx cap add android```

если надо использовать код и для web
https://capacitorjs.com/docs/web
`npx cap add web`

Устанавливаем дополнительные зависимости (о них пишут ворнинги в консоли)



### Для синхронизации плагинов vuex и vue-router 
надо установить https://www.npmjs.com/package/vuex-router-sync
`npm i vuex-router-sync`
! Не получается в роутере получить доступ к vuex state

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
