import { store } from '../store/index'

export default (to, from, next) => {
    const user = store.getters.logado;
    // || to.path === "/cadastro"
    if (user.uid !== undefined && user.uid !== null) {
      if (next !== to) {
        next();
      }
    } else {
      if (next !== "/login") {
        next("/login");
      }
    }
}