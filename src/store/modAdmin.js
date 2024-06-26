import { firebaseApp } from "../firebase"
import { getDatabase, ref, get, child, update, push } from "firebase/database"

const state = {
    items: [],
    categorias: [],
    unidades: [],
    version: ""
}

const getters = {
    items(state) {
        return state.items
    },
    categorias(state) {
        return state.categorias
    },
    unidades(state) {
        return state.unidades
    },
    version(state) {
        return state.version
    },
}

const actions = {
    loadVersion({ commit }) {
        let manifest = document.querySelector('link[rel="manifest"]')
        let file = manifest.href
        let v = ''
        fetch(file)
            .then(response => response.json())
            .then(data => {
                v = data
                commit('setVersion', v.version)
            })
    },
    loadItems({ commit }) {
        const db = getDatabase(firebaseApp)
        const dbRef = ref(db)
        get(child(dbRef, 'items/')).then((snapshot) => {
            if (snapshot.exists()) {
                const items = []
                const obj = snapshot.val()
                for (const key in obj) {
                    items.push({
                        id: key,
                        descricao: obj[key].descricao,
                        unidade: obj[key].unidade,
                        categoria: obj[key].categoria,
                        valor: obj[key].valor
                    })
                }
                commit('setItems', items)
            } else {
                console.log("Dados não encontrados.")
            }
        }).catch((error) => {
            console.error(error)
        })
    },
    loadCategorias({ commit }) {
        const db = getDatabase(firebaseApp)
        const dbRef = ref(db)
        get(child(dbRef, 'categorias/')).then((snapshot) => {
            if (snapshot.exists()) {
                const cats = []
                const obj = snapshot.val()
                for (const key in obj) {
                    cats.push({
                        id: key,
                        nome: obj[key].nome,
                    })
                }
                commit('setCategorias', cats)
            } else {
                console.log("Dados não encontrados.")
            }
        }).catch((error) => {
            console.error(error)
        })
    },
    loadUnidades({ commit }) {
        const db = getDatabase(firebaseApp)
        const dbRef = ref(db)
        get(child(dbRef, 'unidades/')).then((snapshot) => {
            if (snapshot.exists()) {
                const unids = []
                const obj = snapshot.val()
                for (const key in obj) {
                    unids.push({
                        id: key,
                        nome: obj[key].nome,
                        abrev: obj[key].abrev,
                    })
                }
                commit('setUnidades', unids)
            } else {
                console.log("Dados não encontrados.")
            }
        }).catch((error) => {
            console.error(error)
        })
    },
    saveItem({ commit }, obj) {
        const db = getDatabase(firebaseApp)
        let key
        push(ref(db, 'items/'), obj)
            .then((data) => {
                key = data.key
                return key
            })
            .then(key => {
                commit('saveItem', key)
            })
    },
    saveCategoria({ commit }, obj) {
        const db = getDatabase(firebaseApp)
        let key
        push(ref(db, 'categorias/'), obj)
            .then((data) => {
                key = data.key
                return key
            })
            .then(key => {
                commit('saveCategoria', key)
            })
    },
    saveUnidade({ commit }, obj) {
        const db = getDatabase(firebaseApp)
        let key
        push(ref(db, 'unidades/'), obj)
            .then((data) => {
                key = data.key
                return key
            })
            .then(key => {
                commit('saveUnidade', key)
            })
    },
    updateItem({ commit }, obj) {
        const db = getDatabase(firebaseApp)
        const updates = {};
        updates['items/' + obj.id] = obj;
        update(ref(db), updates);
        commit('saveItem', true)
    },
    updateCategoria({ commit }, obj) {
        const db = getDatabase(firebaseApp)
        const updates = {};
        updates['categorias/' + obj.id] = obj;
        update(ref(db), updates);
        commit('saveCategoria', true)
    },
    updateUnidade({ commit }, obj) {
        const db = getDatabase(firebaseApp)
        const updates = {};
        updates['unidades/' + obj.id] = obj;
        update(ref(db), updates);
        commit('saveUnidade', true)
    },
    deleteItem({ commit }, id) {
        const db = getDatabase(firebaseApp)
        const updates = {};
        updates['items/' + id] = null;
        update(ref(db), updates);
        commit('saveItem', true)
    },
    deleteCategoria({ commit }, id) {
        const db = getDatabase(firebaseApp)
        const updates = {};
        updates['categorias/' + id] = null;
        update(ref(db), updates);
        commit('saveCategoria', true)
    },
    deleteUnidade({ commit }, id) {
        const db = getDatabase(firebaseApp)
        const updates = {};
        updates['unidades/' + id] = null;
        update(ref(db), updates);
        commit('saveUnidade', true)
    },
}

const mutations = {
    setVersion(state, n) {
        state.version = 'v - ' + n
    },
    setItems(state, obj) {
        state.items = obj
    },
    setCategorias(state, obj) {
        state.categorias = obj
    },
    setUnidades(state, obj) {
        state.unidades = obj
    },
    saveItem(obj) {
        console.log(obj)
    },
    saveCategoria(obj) {
        console.log(obj)
    },
    saveUnidade(obj) {
        console.log(obj)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
