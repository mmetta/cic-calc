import { initializeApp } from "firebase/app"

export const firebaseApp = initializeApp({
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_DATABASE_URL,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_APP_ID
})

export default function install(Vue) {
    Object.defineProperty(Vue.prototype, '$firebase', {
        get() {
            return firebaseApp
        }
    })
}
