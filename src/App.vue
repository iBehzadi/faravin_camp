<template>
 <div
    v-if="offlineReady || needRefresh"
    class="pwa-toast"
    role="alert"
  >
    <div class="message">
      <span v-if="offlineReady">
        App ready to work offline
      </span>
      <span v-else>
        New content available, click on reload button to update.
      </span>
    </div>
    <button v-if="needRefresh" @click="updateServiceWorker()">
      Reload
    </button>
    <button @click="close">
      Close
    </button>
  </div>

  <Header />
  <router-view></router-view>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
import { useStore } from 'vuex'
//@ts-ignore
import { useRegisterSW } from 'virtual:pwa-register/vue'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Footer
  },
  setup() {

    
    const {
      offlineReady,
      needRefresh,
      updateServiceWorker,
    } = useRegisterSW()

    const close = async () => {
      offlineReady.value = false
      needRefresh.value = false
    }

    const store = useStore();
    let _fontFamily = localStorage.getItem('fontFamily');
    let _translate = localStorage.getItem('translator');
    let _ayaFontSize = localStorage.getItem('ayaFontSize');
    let _trsFontSize = localStorage.getItem('trsFontSize');
    if (_fontFamily) {
      store.dispatch('changeF', _fontFamily);
    }
    if (_translate) {
      store.dispatch('changeT', _translate);
      store.dispatch('dynamicImport',_translate);
    }
    if (_ayaFontSize) {
      store.dispatch('ayaFontChange', _ayaFontSize);
    }
    if (_trsFontSize) {
      store.dispatch('trsFontChange', _trsFontSize);
    }

    return {
      needRefresh,
      updateServiceWorker,
      offlineReady
    }
  }

})
</script>

<style lang="scss">
@import url(./style/base.scss);
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  padding: 12px;
  border: 1px solid #8885;
  border-radius: 4px;
  z-index: 10;
  text-align: left;
  box-shadow: 3px 4px 5px 0px #8885;
}
.pwa-toast .message {
  margin-bottom: 8px;
}
.pwa-toast button {
  border: 1px solid #8885;
  outline: none;
  margin-right: 5px;
  border-radius: 2px;
  padding: 3px 10px;
}

#app {
  font-family: Yekan, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
