<template>
    <section class="search-container">
        <div class="search-logo">
            <img src="../assets/img/quran-logo.png" />
        </div>
        <div class="bar">
            <input class="searchbar" placeholder="جستجو" type="text" title="Search" />
            <button id="search-submit" type="submit"></button>
        </div>
    </section>

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

.search-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 60px;
}

.search-logo {
    margin-bottom: 20px;
}

.search-logo img {
    max-width: 270px;
}

.bar {
    margin: 0 auto;
    position: relative;
    width: 575px;
    border-radius: 30px;
    border: 1px solid #dcdcdc;
    box-shadow: 1px 1px 4px 1px #ccc;
    background-image: url("../assets/img/search.png");
    background-repeat: no-repeat;
    background-size: 40px;
    background-position-y: center;
}

#search-submit {
    width: 40px;
    height: 40px;
    position: absolute;
    left: 0;
    top: 4px;
    background: none;
    cursor: pointer;
    border: none;
}

.bar:hover {
    box-shadow: 1px 1px 4px 1px #007bff;
}

.bar:focus-within {
    box-shadow: 1px 1px 4px 1px #007bff;
    outline: none;
}

.searchbar {
    height: 45px;
    border: none;
    width: 80%;
    font-size: 1rem;
    border-radius: 30px;
    margin-right: 15px;
    outline: none;
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
@media (max-width: 740px) {
    .bar {
        max-width: 400px
    }
}
@media (max-width: 440px) {
    .bar {
        max-width: 300px
    }
    .searchbar {
        width: 70%;
    }
    
}
</style>
  