// https://firebase.google.com/docs/auth/web/start?hl=en&authuser=0
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { NativeBiometric, BiometryType } from "capacitor-native-biometric";

export default {
  state: {
    user: {
      email: '',
      password: ''
    },
    isSigned: '',
    isLogged: '',
    isRemember: '',
    biometryType: {
      prop: null,
      name: ''
    },
    server: 'www.example.com'
  },
  getters: {
    user(state) {
      return state.user
    },
    server(state) {
      return state.server
    },
    isSigned(state) {
      return state.isSigned
    },
    isLogged(state) {
      return state.isLogged
    },
    isRemember(state) {
      return state.isRemember
    },
    biometryType(state) {
      return state.biometryType
    }
  },
  mutations: {
    updateUser(state, user) {
      state.user = user
    },
    updateSigned(state, isSigned) {
      state.isSigned = isSigned
      window.localStorage.setItem('isSigned', isSigned)
    },
    updateLogged(state, isLogged) {
      state.isLogged = isLogged
      window.localStorage.setItem('isLogged', isLogged)
    },
    setBiometryType(state, type) {
      state.biometryType = type
    },
    clearData(state) {
      for (const key in state) {
        if (typeof key !== 'object' && key !== 'server') {
          state[key] = ''
        }
      }
      window.localStorage.setItem('isSigned', '')
      window.localStorage.setItem('isLogged', '')
    },
  },
  actions: {
    signUp({ commit, getters }, user) {

      let isSigned = '';
      FirebaseAuthentication.createUserWithEmailAndPassword({
          email: user.email,
          password: user.password,
        })
        .then((userCredential) => {
          const { user } = userCredential;
          console.log(user);
          isSigned = user ? '1' : ''

          // Save user's credentials
          NativeBiometric.setCredentials({
            username: user.email,
            password: user.password,
            server: getters.server,
          }).then();
        })
        .catch((error) => {
          console.log(error);
          if (error.code === 'auth/email-already-in-use') {
            alert('Такой логин уже существует')
          } else {
            alert('Ошибка регистрации: \n\n' + error.code)
          }
        });

      commit('isSigned', isSigned)
    },

    logInWithEmailAndPassword(ctx, user) {
      let isLogged = '1'
      FirebaseAuthentication.signInWithEmailAndPassword({
          email: user.email,
          password: user.password,
        })
        .then((userCredential) => {
          const user = userCredential.user
          console.log(user)
          isLogged = user ? '1' : '' 
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          window.localStorage.setItem("isSigned", "");
          return false;
        });

        ctx.commit('updateLogged', isLogged)
    },

    async defineBiometryType(ctx) {
      const result = await NativeBiometric.isAvailable();

      const str = 'Вход по '
      const type = {}
      switch (result.biometryType) {
        case BiometryType.TOUCH_ID:
        case BiometryType.FINGERPRINT:
          type.prop = 'TOUCH_ID'
          type.name = str  + 'отпечатку'
          break

        case BiometryType.FACE_ID:
        case BiometryType.FACE_AUTHENTICATION:
          type.prop = 'FACE_ID'
          type.name = str + 'FACE ID'
          break

        case BiometryType.IRIS_AUTHENTICATION:
          type.prop = 'IRIS_AUTHENTICATION'
          type.name = str + 'радужной оболочке'
          break

        case BiometryType.MULTIPLE:
          type.prop = 'MULTIPLE'
          type.name = 'Множественна идентификация'
          break
      
        default:
          alert("Биометрия не поддерживается")
          type.prop = null
          type.name = 'Биометрия не поддерживается'
          break
      }

      ctx.commit('biometryType', type)
      return type
    },

    async performBiometricVerificatin({ getters }) {

      const verified = await NativeBiometric.verifyIdentity({
          reason: "Для более простого входа",
          title: "Вход по биометрии",
        })
        .then(() => true)
        .catch(() => false);

      if (!verified) {
        alert("Биометрия не идентифицирована.\n\nИспользуйте другой способ входа.");
        return;
      }

      const credentials = await NativeBiometric.getCredentials({
        server: getters.server,
      });

      return credentials;
    },

    clearNativeBiometric({ getters }) {
      NativeBiometric.setCredentials({
        username: '',
        password: '',
        server: getters.server,
      }).then();
    },

    logOut({commit, dispatch}) {
      const user = {
        email: '',
        password: ''
      }
      commit('updateUser', user)
      commit('clearData')
      dispatch('clearNativeBiometric')
    }
  }
}
