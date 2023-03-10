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
  },
  actions: {
    
    signUp({
      commit,
      getters,
      dispatch
    }, user) {

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
          alert('???? ????????????????????????????????')
        })
        .catch((error) => {
          console.log(error)
          alert('?????????? ?????????? ?????? ????????????????????')
          if (error?.code.match('email-already-in-use')) {
            alert('?????????? ?????????? ?????? ????????????????????')
          } else {
            alert('???????????? ??????????????????????: \n\n' + JSON.stringify(error))
          }
        });

      commit('updateSigned', isSigned)
    },

    async setCredentials({commit}, user) {
      await NativeBiometric.setCredentials(user).then( res => JSON.stringify(res))
      commit('updateCredentials', '1')
    },

    async logInWithEmailAndPassword(ctx, user) {
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
      return result;
    },

    async defineBiometryType(ctx) {
      const result = await NativeBiometric.isAvailable();

      const str = '???????? ???? '
      const type = {}
      switch (result.biometryType) {
        case BiometryType.TOUCH_ID:
        case BiometryType.FINGERPRINT:
          type.prop = 'TOUCH_ID'
          type.name = str + '??????????????????'
          break

        case BiometryType.FACE_ID:
        case BiometryType.FACE_AUTHENTICATION:
          type.prop = 'FACE_ID'
          type.name = str + 'FACE ID'
          break

        case BiometryType.IRIS_AUTHENTICATION:
          type.prop = 'IRIS_AUTHENTICATION'
          type.name = str + '???????????????? ????????????????'
          break

        case BiometryType.MULTIPLE:
          type.prop = 'MULTIPLE'
          type.name = '???????????????????????? ??????????????????????????'
          break

        default:
          alert("?????????????????? ???? ????????????????????????????")
          type.prop = null
          type.name = '?????????????????? ???? ????????????????????????????'
          break
      }
      
      ctx.commit('setBiometryType', type)
      return type
    },

    async performBiometricVerificatin({state}) {

      const verified = await NativeBiometric.verifyIdentity({
          reason: "?????? ?????????? ???????????????? ??????????",
          title: state.biometryType.name,
        })
        .then(() => true)
        .catch(() => false);

      if (!verified) {
        alert("?????????????????? ???? ????????????????????????????????.\n\n?????????????????????? ???????????? ???????????? ?????????? ?????? ???????????????????? ?????? ??????.");
        return;
      }
      const credentials = await NativeBiometric.getCredentials({
        server: state.server,
      });
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
      dispatch('clearNativeBiometric')
    }
  }
}