import { createApp } from 'vue'
import App from './App.vue'

import router from "./router/index"
import { createStore } from "vuex"
import Toast from 'vue3-toast-single'
import 'vue3-toast-single/dist/toast.css'


/* if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', {scope: './'})
    .then((reg) => {
      // registration worked
      console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch((error) => {
      // registration failed
      console.log('Registration failed with ' + error);
    });
  }
 */
const store = createStore({
    state() {

        return {
            translatorName: 'ansarian',
            ayaFontSize: 18,
            trsFontSize: 16,
            textFontFamily: 'Yekan',
            translator :''
        };

    },

    mutations: {
        changeTsname(state: any, newTranslatorName) {
            state.translatorName = newTranslatorName;
        },
        changeFont(state, newFont) {
            state.textFontFamily = newFont;
        },
        ayaFontSize(state, newSize) {
            state.ayaFontSize = newSize;
        },
        trsFontSize(state, newSize) {
            state.trsFontSize = newSize;
        },
        translatorChange(state, newTranslator) {
            state.translator = newTranslator
        }
    },
    actions: {
        changeT(store, newTranslatorName) {
            store.commit("changeTsname", newTranslatorName);
        },
        changeF(store, newFont) {
            store.commit("changeFont", newFont);
        },
        ayaFontChange(store, newSize) {
            store.commit("ayaFontSize", newSize);
        },
        trsFontChange(store, newSize) {
            store.commit("trsFontSize", newSize);
        },
        dynamicImport(store, newTranslator) {
            if (newTranslator == 'makarem') {
                import('./assets/tarjomeh/makarem')
                    .then((res) => { store.commit("translatorChange", res.makarem) })
            } else if (newTranslator == 'maleki') {
                import('./assets/tarjomeh/maleki')
                    .then((res) => { store.commit("translatorChange", res.maleki) })
            } else {
                import('./assets/tarjomeh/ansarian')
                    .then((res) => { store.commit("translatorChange", res.ansarian) })
            }
        }
    }
});

createApp(App).use(router).use(store).use((Toast as any), {
    verticalPosition: "bottom",
    duration: 1500
}).mount('#app')