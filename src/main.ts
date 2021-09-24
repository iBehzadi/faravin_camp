import { createApp } from 'vue'
import App from './App.vue'

import router from "./router/index"
import { createStore } from "vuex"

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', {scope: './sw'})
    .then((reg) => {
     
      console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch((error) => {
      
      console.log('Registration failed with ' + error);
    });
  }

const store = createStore({
    state() {
        return {
            translator: 'ansarian',
            ayaFontSize: 18,
            trsFontSize: 14,
            textFontFamily: 'Yekan',

        };
    },
    mutations: {
        changeTsname(state: any, newTranslator) {
            state.translator = newTranslator;
        },
        changeFont(state, newFont) {
            state.textFontFamily = newFont;
        },
        ayaFontSize(state, newSize) {
            state.ayaFontSize = newSize;
        },
        trsFontSize(state, newSize) {
            state.trsFontSize = newSize;
        }
    },
    actions: {
        changeT(store, newTranslator) {

            store.commit("changeTsname", newTranslator);

        },
        changeF(store, newFont) {
            store.commit("changeFont", newFont);
        },
        ayaFontChange(store, newSize) {
            store.commit("ayaFontSize", newSize);
        },
        trsFontChange(store, newSize) {
            store.commit("trsFontSize", newSize);
        }
    }
});

createApp(App).use(router).use(store).mount('#app')
