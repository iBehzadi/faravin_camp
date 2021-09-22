<template>
  <router-link>
    <div class="sura">
      <div class="sura-number">{{ number }}</div>
      <div class="sura-name">
        <span>سوره {{ title }}</span>
      </div>
      <span>{{ mecOrMed }}</span>
    </div>
  </router-link>
</template>

<style>
@import "../assets/font-faces.css";
</style>

<script lang="ts">
export default {
  props: ["number", "title", "mecOrMed"],

};
</script>

<style lang="scss" scoped>
.sura {
  display: flex;
  min-width: 300px;
  justify-content: space-around;
  background-color: #fbfbfb;
  border: 1px solid #ebebed;
  padding: 16px;
  border-radius: 4px;
  margin: 8px;
  &:hover {
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  }
  .sura-name {
    color: rgb(0, 26, 255);
    font-weight: 700;
  }

  .sura-number {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ccc;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    opacity: 0.8;
  }
}

</style>