<template>
  <router-link>
    <div class="sura">
      <div class="surah-number">{{ number }}</div>
      <div class="surah-name">
        <span>سوره {{ title }}</span>
      </div>
    </div>
  </router-link>
</template>

<style>
@import "../assets/font-faces.css";
</style>

<script lang="ts">
export default {
  props: ["number", "title"],

};
</script>

<style scoped>
.sura {
  display: flex;
  min-width: 300px;
  justify-content: space-around;
  background-color: #fbfbfb;
  border: 1px solid #ebebed;
  padding: 16px;
  border-radius: 4px;
  margin: 8px;
}
.sura:hover {
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .2)
}
.surah-name {
  color: rgb(0, 26, 255);
  font-weight: 700;
}
.surah-number {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ccc;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  opacity: 0.8;
}
.icon-surah {
  font-size: 25px;
}
</style>