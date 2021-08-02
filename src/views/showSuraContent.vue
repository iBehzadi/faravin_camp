<template>
    <div class="setting-container">
        <div class="t-selector">
            <span>مترجم</span>
            <select
                @change="translatorChanger"
                class="t-select"
                name="locale"
                v-model="translateSelector"
            >
                <option value="ansarian">انصاریان</option>
                <option value="maleki">ملکی</option>
                <option value="makarem">مکارم</option>
            </select>
        </div>
    </div>

    <section class="sura-container">
        <div class="ayas" v-for="(aya, i) in ayas" :key="i">
            <span class="aya">({{ aya }}).{{ i + 1 }}</span>
            <span class="copy icon-copy" @click="copyAya(aya, translate[i])"></span>
            <br />
            <span class="trs">{{ translate[i] }}</span>
        </div>
    </section>
</template>

<script lang="ts">

import { computed, ref, watch } from "@vue/runtime-core";
import { SuraList } from "../qdata";
//@ts-ignore
import * as quranTranslate from "../assets/tarjomeh/fa.translate"
//@ts-ignore
import * as quranText from "../qtext";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
    setup() {

        const route: unknown = useRoute();
        const store = useStore();
        let ayaList = quranText.ayat.split('\n');
        let result, ayas, translate;
        let ayaTranslate = computed(() => quranTranslate.ansarian.split('\n'))
        let tname = computed(() => store.state.translator)

        let translateSelector = ref('ansarian');
        function translatorChanger() {
            store.dispatch('changeT', translateSelector.value)
        }
        watch(tname, () => {
            if (tname.value == 'ansarian') {
                console.log('ansarian')
                ayaTranslate = computed(() => quranTranslate.ansarian.split('\n'))
            } else if (tname.value == 'maleki') {
                console.log('maleki')
                ayaTranslate = computed(() => quranTranslate.maleki)

            } else {
                console.log('makarem')
                ayaTranslate = computed(() => quranTranslate.makarem.split('\n'))

            }
        })
        function copyAya(aya: string, trs: string) {
            navigator.clipboard.writeText(aya + "/" + trs)

        }
        result = computed(() => {
            let sura = SuraList[route.params.id - 1];
            let start = sura[0];
            let end = start + sura[1];
            let aya = ayaList.slice(start, end);
            aya[0] = aya[0].replace('بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ ', '')
            let trs = ayaTranslate.value.slice(start, end)
            return { aya, trs };
        })

        ayas = result.value.aya;
        translate = result.value.trs;


        return {
            ayas,
            translate,
            copyAya,
            translateSelector,
            translatorChanger
        }
    }
}
</script>

<style scoped>
@import url("../assets/icon-style.css");
.sura-container {
    margin-top: 60px;
}
.setting-container {
    height: 45px;
    width: 100%;
    background-color: #f3f3f4;
    position: sticky;
    top: 48px;
    z-index: 9;
}
.t-select {
    border: 1px solid cadetblue;
    border-radius: 4px;
    cursor: pointer;
    color: #000;
    background-color: #fff;
    position: relative;
    margin-right: 10px;
    padding: 5px;
}
.t-select:focus {
    border: 1px solid cadetblue;
}
.ayas {
    font-size: 20px;
    margin: 10px 20px;
    padding: 10px;
    background-color: #eef8e5;
    border: 1px solid #d4ddcc;
    border-top: 0px;
    position: relative;
    border-radius: 5px;
    padding-top: 25px;
}
.ayas:hover {
    background-color: #eef9f6;
}
.ayas .trs {
    font-size: 18px;
}
.ayas .copy {
    position: absolute;
    left: 5px;
    top: 5px;
    cursor: pointer;
    margin-right: 5px;
}
</style>