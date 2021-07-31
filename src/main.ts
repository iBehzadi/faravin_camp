import { createApp } from 'vue'
import App from './App.vue'
//@ts-ignore
import router from "./router/index.js"
import {createStore} from "vuex"


const store = createStore({
    state() {
        return {
            translator : 'ansarian'
        };
    },
    mutations: {
        changeTsname(state, newTranslator) {
            state.translator = newTranslator;
        }
    },
    actions: {
        changeT(state, newTranslator) {
            state.commit("changeTsname", newTranslator);
        }
    }
});

createApp(App).use(router).use(store).mount('#app')
