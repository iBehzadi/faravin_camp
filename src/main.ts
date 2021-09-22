import { createApp } from 'vue'
import App from './App.vue'
//@ts-ignore
import router from "./router/index.ts"
import { createStore } from "vuex"


const store = createStore({
    state() {
        return {
            translator: 'ansarian',
            ayaFontSize: 20,
            trsFontSize: 18,
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
