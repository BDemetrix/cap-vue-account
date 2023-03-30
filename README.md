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

Решение: https://github.com/nodejs/node-gyp/issues/569

Чтобы в симуляторе появилась виртуальна клавиатура надо снять галочку "Connect Hardware Keyboard"  
В зависимости от версии Xcode меню может отличаться.  
В Xcode 14: меню симулятора -> I/O -> Keyboard -> "Connect Hardware Keyboard"  
![image](https://user-images.githubusercontent.com/64604742/222782000-b0fd8dbb-0b88-47a8-83be-6e9d6b8e7def.png)  

*********  

Для создания сертификатов для разрешения push необходимо, чтоб macBook был залогинен на разработчика на которого выдается сертификат.  
Логиниться приходится через App Store, затем через программу Developer  
![image](https://user-images.githubusercontent.com/64604742/224035483-8ba672f5-ac57-4639-8cb4-731c920f08a8.png)

Затем надо сгерерировать ключ в утилите `Keychain Access` (лежит в Applications/Utilities/)  
![image](https://user-images.githubusercontent.com/64604742/224040433-2aafb5bb-889e-4a74-889e-737094f826ae.png)  

и загрузить этот ключь на стр. https://developer.apple.com/account/resources/certificates/list  
при добавлении сертификата  
![image](https://user-images.githubusercontent.com/64604742/224045468-41da8dea-9913-4884-9ac0-5b1574bfc94d.png)  
![image](https://user-images.githubusercontent.com/64604742/224046091-36888276-4440-48f5-9840-e357745573c9.png)  
  
затем скачать сертификат и открыть его (два реза кликнув)
![image](https://user-images.githubusercontent.com/64604742/224046729-48e35176-034f-4efd-b825-d34b5afdbadd.png)




#### Тестировать приложение на реальном iPhone
https://www.youtube.com/watch?v=e3svWl96dj0

#### Установочаный файл .IPA в XCODE
Создать в XCODE архив Product -> Archive, кликнуть по нему праввой кнопкой, выбрать Show File Inspector, изменить расширение на .zip, достать из папки архива Products/Applications/  файл с типом Application и поместить в папку /Payload, сжать Payload в `zip`, изменить расширение на `ipa`.  
Payload.ipa - приложение  

*!* Для сборки архива обязательно выбрать настройку  `Any iOS Device`:  
![image](https://user-images.githubusercontent.com/64604742/224749770-671062c6-0706-481b-8be6-4502431f0d93.png)  

Инструкция: https://www.youtube.com/watch?v=daPW5dddku8  

Либо:  
Файл для установки лежит в инспекторе файлов (дерево проекта) Xcode 
в ProjectName/Products/ProjectName.app
Пример: App/Product/App.app
Кликнуть по нему праввой кнопкой, выбрать Show File Inspector, скопировать в другую директорию в папку /Payload, сжать Payload в `zip`, изменить расширение на `ipa`
Файл *.ipa можно установить на iPhone  
  
![image](https://user-images.githubusercontent.com/64604742/222783231-5682417e-aa38-4b9c-831e-027a65def3e3.png)

#### Установить любое приложение на iPhone
https://www.youtube.com/shorts/1Od2EF3S46M  
https://www.youtube.com/watch?v=kcd0WtSVW6s  
  
  



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

![image](https://user-images.githubusercontent.com/64604742/223053103-3e78a69a-0b46-4faf-b18f-fad0064075bc.png)  

! При подключении сервисов firebase необходимо мышкой перетащить GoogleService-Info.plist из папки с проектом в навигатор Xcode рядом с Info.plist (почему-то Xcode не подхватывает его автоматически)

! При сборке capacitorjs или другим фреймворком НЕ ДОБАВЛЯТЬ в Xcode > File > Add Packages (описано в инструкции по предыдущей ссылке). Добавление приводит к ошибке `Redefinition of module 'Firebase'`

#### Добавление приложения Android в firebase
https://console.firebase.google.com/project/cap-vue-account/settings/general/android:com.CapVueAcc.app?hl=ru

#### Добавление приложения iOS в firebase
https://console.firebase.google.com/project/cap-vue-account/settings/general/ios:com.CapVueAcc.app?hl=ru
! При сборке capacitorjs или другим фреймворком НЕ ДОБАВЛЯТЬ в Xcode > File > Add Packages (описано в инструкции по предыдущей ссылке). Добавление приводит к ошибке `Redefinition of module 'Firebase'`

! Для отправления пушей через firebase для устройств Apple  
необходимо получение ключа (APNs Authentication Key) или сертификатов (APNs Certificates) 
и добавление их в консоль firebase  
**Важно**:  
- ключ APNs выдается в единственном экземпляре для всех проектов. При утере ключа, придется его инвалидировать, генерировать новый и заменять для всех существующих проектов  
- если выбрать APNs Certificates то придется их обновлять раз в год   
https://www.youtube.com/watch?v=8c3xmsbDNxQ  

![image](https://user-images.githubusercontent.com/64604742/223053535-85b20a5a-738b-45a8-945b-0bd9734cbd6c.png)  
![image](https://user-images.githubusercontent.com/64604742/223053741-d41f2b97-b874-4974-bdc0-66a916e43d9c.png)
![image](https://user-images.githubusercontent.com/64604742/223054162-9d4a7812-9acc-4b01-8ef2-7c49e8d8562a.png)

**Важно:**  
Push-уведомления не работают в симуляторе, поэтому для тестирования нужен девайс.  
https://habr.com/ru/post/156811/


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
Для каждой платформы отдельно можно использовать плагин:  
https://capacitorjs.com/docs/apis/push-notifications  
Если этот плагин использует firebase, то iOS следует настроить как описано в   
https://capacitorjs.com/docs/guides/push-notifications-firebase

Для отправки Push с помощью firebase надо использоваь плагин (не будет тработать с Huawei выпущеных после 2019 года)  
https://www.npmjs.com/package/@capacitor-firebase/messaging  
**при использовании данного плагина не удалось получить пуш, хотя токен приходит и ответ при отправке пуша от firebase тоже приходит**

**! При смене плагина: не забыть изменить capacitor.config.json в соотверствии с документацией используемого плагина**  
**Также надо изменить AndroidManifest.xml и AppDelegate.swift**

Выполнить действия  
https://i.stack.imgur.com/FbQDL.png

Для этого надо скачать и установить сертификат со своего аккаунта разработчика  
![image](https://user-images.githubusercontent.com/64604742/223456786-73297605-9eab-4361-bbb3-c68022398c19.png)


https://firebase.google.com/docs/cloud-messaging?hl=ru  

Настройка доступов для отправления пушей осуществляется в консоли firebase  
Project settings -> Cloud Messaging

! Для отправления пушей через firebase для устройств Apple  
необходимо получение ключа (APNs Authentication Key) и сертификатов (APNs Certificates) 
и добавление их в консоль firebase


### Push Kit от Huawei  
https://developer.huawei.com/consumer/ru/hms/huawei-pushkit/
https://habr.com/ru/company/huawei/blog/520710/
https://www.youtube.com/watch?v=YclRgQZu3Fc


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
https://habr.com/ru/post/280626/

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
  
До выполнения следующих установок необходимо файле в `capacitor.config.json` в поле appId указать BundleId приложения.  
(особенно важно для iOS, этот же BundleId надо будет указывать при получении сертификатов и профилей)  

```npx cap add ios```  
```npx cap add android```

если надо использовать код и для web
https://capacitorjs.com/docs/web
`npx cap add web`

Устанавливаем дополнительные зависимости (о них пишут ворнинги в консоли)



### Для синхронизации плагинов vuex и vue-router 
надо установить https://www.npmjs.com/package/vuex-router-sync
`npm i vuex-router-sync`

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
