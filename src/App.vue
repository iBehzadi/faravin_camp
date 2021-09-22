<template>
  <Header />
  <router-view></router-view>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Footer
  },
  setup() {
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
    }
    if (_ayaFontSize) {
      store.dispatch('ayaFontChange', _ayaFontSize);
    }
    if (_trsFontSize) {
      store.dispatch('trsFontChange', _trsFontSize);
    }
  }

})
</script>

<style>
@import url(./style/base.scss);

#app {
  font-family: Yekan, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
