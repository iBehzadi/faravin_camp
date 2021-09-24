<template>
    <section class="search">
        <div class="search__logo">
            <img src="../assets/img/quran-logo.webp" alt="quran-logo" />
        </div>
        <div class="search__bar">
            <input class="search__input" placeholder="جستجو" type="text" title="Search" />
            <button class="search__submit" type="submit"></button>
        </div>
    </section>

    <section class="surah-list">
        <Sura
            :to="{ name: 'showSuraContent', params: { id: i + 1 } }"
            v-for="(item, i) in suraList.sura"
            :key="i"
            :title="item"
            :mec-or-med="suraList.mecOrMed[i]"
            :numbers="i + 1"
        ></Sura>
    </section>
</template>

<script lang="ts">
import { SuraList } from "../qdata";
import Sura from "../components/sura.vue";
import { computed } from "@vue/runtime-core";

export default {
    name: 'App',
    components: {
        Sura,
    },
    setup() {
        let suraList = computed(() => {
            let sura =[], mecOrMed = []
            for (let i = 0; i < SuraList.length; i++) {
                sura[i] = SuraList[i][4];
                if (SuraList[i][7] == "Meccan") {
                    mecOrMed[i] = "مکه";
                } else {
                    mecOrMed[i] = "مدینه";
                }
            }
            return {sura, mecOrMed}
        })

        return {
            suraList
        };
    },
}
</script>

<style lang="scss" scoped>
@import url("../style/base.scss");
.search {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 60px;
    &__logo {
        margin-bottom: 20px;
        img {
            max-width: 270px;
        }
    }
    &__bar {
        margin: 0 auto;
        position: relative;
        width: 575px;
        border-radius: 30px;
        border: 1px solid #dcdcdc;
        box-shadow: 1px 1px 4px 1px #ccc;
        background-image: url("../assets/img/search.webp");
        background-repeat: no-repeat;
        background-size: 40px;
        background-position-y: center;
        &:hover {
            box-shadow: 1px 1px 4px 1px #007bff;
        }
        &:focus-within {
            box-shadow: 1px 1px 4px 1px #007bff;
            outline: none;
        }
        .search__input {
            height: 45px;
            border: none;
            width: 80%;
            font-size: 1rem;
            margin-right: 15px;
            outline: none;
        }
        .search__submit {
            width: 40px;
            height: 40px;
            position: absolute;
            left: 0;
            top: 4px;
            background: none;
            cursor: pointer;
            border: none;
        }
    }
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
    .search__bar {
        max-width: 400px;
    }
}
@media (max-width: 440px) {
    .search__bar {
        max-width: 300px;
    }
    .search__input {
        width: 70% !important;
    }
}
</style>
  