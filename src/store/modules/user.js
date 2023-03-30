// https://firebase.google.com/docs/auth/web/start?hl=en&authuser=0
import {
  FirebaseAuthentication
} from '@capacitor-firebase/authentication';
import {
  NativeBiometric,
  BiometryType
} from "capacitor-native-biometric";

export default {
  state() {
    return {
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
      server: 'www.example.com',
      hasCredentials: '',
      msg: {},
    }
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
    hasCredentials(state) {
      return state.hasCredentials
    },
    biometryType(state) {
      return state.biometryType
    },
    getMsg(state) {
      return state.msg
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
    updateCredentials(state, val) {
      state.hasCredentials = val
      window.localStorage.setItem('hasCredentials', val)
    },
    clearData(state) {
      for (const key in state) {
        if (typeof key !== 'object' && key !== 'server') {
          state[key] = ''
        }
      }
      window.localStorage.setItem('hasCredentials', '')
      window.localStorage.setItem('isSigned', '')
      window.localStorage.setItem('isLogged', '')
    },
    setMsg(state, msg) {
      state.msg = msg
    }
  },
  actions: {
    
    signUp({
      commit,
      getters,
      dispatch
    }, user) {
      commit('setLoading', true)
      let isSigned = '1';
      FirebaseAuthentication.createUserWithEmailAndPassword({
          email: user.email,
          password: user.password,
        })
        .then((userCredential) => {
          const uid = userCredential.user.uid;
          console.log(uid);
          isSigned = uid ? '1' : ''

          // Save user's credentials
          const params = {
            username: user.email,
            password: user.password,
            server: getters.server
          }
          dispatch('setCredentials', params)
          alert('Вы зарегистрированы')
        })
        .catch((error) => {
          console.log(error)
          alert('Такой логин уже существует')
          if (error?.code.match('email-already-in-use')) {
            alert('Такой логин уже существует')
          } else {
            alert('Ошибка регистрации: \n\n' + JSON.stringify(error))
          }
        });

      commit('updateSigned', isSigned)
      commit('setLoading', false)
    },

    async setCredentials({commit}, user) {
      await NativeBiometric.setCredentials(user).then( res => JSON.stringify(res))
      commit('updateCredentials', '1')
    },

    async logInWithEmailAndPassword(ctx, user) {
      ctx.commit('setLoading', true)
      let isLogged = ''
      let result = await FirebaseAuthentication.signInWithEmailAndPassword({
          email: user.email,
          password: user.password,
        })
        .then((userCredential) => {
          const uid = userCredential.user.uid
          console.log(user)

          if (uid) {
            isLogged = '1'
          } 

          const params = {
            username: user.email,
            password: user.password,
            server: ctx.getters.server
          }
          ctx.dispatch('setCredentials', params)
          return true
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          window.localStorage.setItem("isSigned", "");
          return false
        });

      ctx.commit('updateLogged', isLogged)
      ctx.commit('setLoading', false)
      return result;
    },

    async defineBiometryType(ctx) {
      const result = await NativeBiometric.isAvailable();

      const str = 'Вход по '
      const type = {}
      switch (result.biometryType) {
        case BiometryType.TOUCH_ID:
        case BiometryType.FINGERPRINT:
          type.prop = 'TOUCH_ID'
          type.name = str + 'отпечатку'
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
          type.name = 'Множественная идентификация'
          break

        default:
          alert("Биометрия не поддерживается. Тип: " + result.biometryType)
          type.prop = null
          type.name = 'Биометрия не поддерживается'
          break
      }
      
      ctx.commit('setBiometryType', type)
      return type
    },

    async performBiometricVerificatin({state, commit}) {
      commit('setLoading', true)
      const verified = await NativeBiometric.verifyIdentity({
          reason: "Для более простого входа",
          title: state.biometryType.name,
        })
        .then(() => true)
        .catch(() => false);

      if (!verified) {
        alert("Биометрия не идентифицирована.\n\nИспользуйте другой способ входа или попробуйте еще раз.");
        commit('setLoading', false)
        return;
      }
      const credentials = await NativeBiometric.getCredentials({
        server: state.server,
      });
      commit('setLoading', false)
      return credentials;
    },

    clearNativeBiometric({
      state
    }) {
      NativeBiometric.setCredentials({
        username: '',
        password: '',
        server: state.server,
      }).then();
    },

    logOut({
      commit,
      dispatch
    }) {
      const user = {
        email: '',
        password: ''
      }
      commit('updateUser', user)
      commit('clearData')
      commit('upFcmSigned', '')
      commit('updateToken', '')
      dispatch('clearNativeBiometric')
    }
  }
}