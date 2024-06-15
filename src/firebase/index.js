import { initializeApp } from "firebase/app"

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyCbuTOyZeZw8UF6VRX8DG1qu-J06LPzgI8",
    authDomain: "cic-calc.firebaseapp.com",
    databaseURL: "https://cic-calc-default-rtdb.firebaseio.com",
    projectId: "cic-calc",
    storageBucket: "cic-calc.appspot.com",
    messagingSenderId: "940021320877",
    appId: "1:940021320877:web:f26be8f239f968d2c68a24"
})

export default function install(Vue) {
    Object.defineProperty(Vue.prototype, '$firebase', {
        get() {
            return firebaseApp
        }
    })
}
