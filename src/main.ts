import { createApp } from 'vue'
import App from './App.vue'
//@ts-ignore
import router from "./router/index.js"
import {createStore} from "vuex"


const store = createStore({
    state() {
        return {
            translator : 'ansarian',
            ayaFontSize: 20,
            trsFontSize: 18,
            textFontFamily: 'Yekan'
        };
    },
    mutations: {
        changeTsname(state:any, newTranslator) {
            state.translator = newTranslator;
        },
        changeFont(state, newFont) {
            state.textFontFamily = newFont;
        },
        incAyaFontSize(state){
            state.ayaFontSize ++;
        },
        decAyaFontSize(state){
            state.ayaFontSize --;
        },
        incTrsFontSize(state){
            state.trsFontSize ++;
        },
        decTrsFontSize(state){
            state.trsFontSize --;
        }
    },
    actions: {
        changeT(state, newTranslator) {
            state.commit("changeTsname", newTranslator);
        },
        changeF(state, newFont) {
            state.commit("changeFont", newFont);
        },
        ayaFontInc(state){
            state.commit("incAyaFontSize")
        },
        ayaFontDec(state){
            state.commit("decAyaFontSize")
        },
        trsFontInc(state){
            state.commit("incTrsFontSize")
        },
        trsFontDec(state){
            state.commit("decTrsFontSize")
        },
    }
});

createApp(App).use(router).use(store).mount('#app')
