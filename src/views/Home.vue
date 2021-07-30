<template>
    <section class="list-container">
        <div class="surah-list">
            <Sura
                :to="{ name: 'showSuraContent', params: { id: i + 1 } }"
                v-for="(item, i) in sura"
                :key="i"
                :title="item"
                :number="i + 1"
            ></Sura>
        </div>
    </section>
</template>

<script lang="ts">
// @ts-ignore
import { SuraList } from "../qdata";
import Sura from "../components/sura.vue";

export default {
    name: 'App',
    components: {
        Sura,
    },
    setup() {
        let sura = [];
        for (let i = 0; i < SuraList.length - 1; i++) {
            sura[i] = SuraList[i][4];
        }

        return {
            sura,

        };
    },
}
</script>

<style>
* {
    direction: rtl;
    font-family: Yekan, sans-serif;
    margin: 0;
    padding: 0;
}
a {
    text-decoration: none;
    color: #000;
}

@font-face {
    font-family: Yekan;
    font-style: normal;
    font-weight: normal;
    src: url("../assets/fonts/yekan/Yekan.ttf") format("ttf");
    src: url("../assets/fonts/yekan/Yekan.eot") format("eot");
    src: url("../assets/fonts/yekan/Yekan.woff") format("woff");
    src: url("../assets/fonts/yekan/Yekan.woff2") format("woff2");
}
.list-container {
    margin-top: 60px;
}
.surah-list {
    
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 32px auto;
}

@media (min-width: 1200px) {
    .surah-list {
        max-width: 1140px;
    }
}

@media (max-width: 1200px) {
    .surah-list {
        max-width: 900px;
    }
}

@media (max-width: 992px) {
    .surah-list {
        max-width: 700px;
    }
}

@media (max-width: 740px) {
    .surah-list {
        max-width: 400px;
    }
}
</style>
  