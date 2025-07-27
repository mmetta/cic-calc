import { firebaseApp } from "../firebase";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const state = {
    logado: {},
    user: {},
    error: ""
}

const getters = {
    logado(state) {
        return state.logado
    },
    user(state) {
        return state.user
    },
    error(state){
      return state.error
    }
}

const actions = {
  loginEmailPass({ commit }, obj) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, obj.email, obj.pass)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        console.log(userCredential.email);
          const obj = {
            uid: userCredential.uid,
            email: userCredential.email
          };
          commit("setError", "")
          commit("setLogado", obj);
        // dispatch("onChanged");
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        console.log(errorCode);
        commit("setError", "E-mail / senha não conferem")
        commit("setLogado", undefined);
      });
  },
onChanged({ commit }) {
    return new Promise((resolve) => {
      const auth = getAuth(firebaseApp);
      onAuthStateChanged(auth, (userCredential) => {
        if (userCredential) {
          const obj = {
            uid: userCredential.uid,
            email: userCredential.email
          };
          commit("setError", "")
          commit("setLogado", obj);
          console.log(userCredential.email);
          resolve(obj);
        } else {
          // commit("setError", "E-mail / senha não conferem")
          commit("setLogado", undefined);
          resolve(userCredential);
        }
      });
    });
  },
  setError({ commit }, txt){
    commit("setError", txt)
  },
  logOut({ commit }) {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        commit("logOut");
        commit("setLogado", undefined);
      })
      .catch((error) => {
        // An error happened.
        commit("setError", "Alguma coisa deu errado!")
        console.log(error);
      });
  },
}

const mutations = {
  setLogado(state, payload) {
    state.logado = payload;
  },
  logOut(state) {
    state.logado = false;
  },
  setError(state, e) {
    state.error = e;
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
};