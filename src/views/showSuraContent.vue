<template>
    <section class="sura-container">
        <div class="aya" v-for="(aya, i) in ayas" :key="i">
            *{{ aya }}*{{ i + 1 }}
            <br />
            <span>{{ translate[i] }}</span>
        </div>
    </section>
</template>

<script lang="ts">

import { computed } from "@vue/runtime-core";
import { SuraList } from "../qdata";
//@ts-ignore
import * as quranTranslate from "../assets/tarjomeh/fa.translate"
//@ts-ignore
import * as quranText from "../qtext";
import { useRoute } from "vue-router";
export default {
    setup() {
        const route: any = useRoute();
        let ayaTranslate = quranTranslate.ansarian.split('\n');
        let ayaList = quranText.ayat.split('\n');
        let result, ayas, translate;

        result = computed(() => {
            let sura = SuraList[route.params.id - 1];
            let start = sura[0];
            let end = start + sura[1];
            let aya = ayaList.slice(start, end);
            aya[0]= aya[0].replace('بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ ','')
            let trs = ayaTranslate.slice(start, end);
            return { aya, trs };
        })

        ayas = result.value.aya;
        translate = result.value.trs;

        return {
            ayas,
            translate
        }
    }
}
</script>

<style scoped>
.sura-container {
    margin-top: 60px;
}
.aya {
    direction: rtl;
    font-size: 25px;
    margin: 10px 20px;
    padding: 10px;

    background-color: #eef8e5;
    border: 1px solid #d4ddcc;
    border-top: 0px;
}
.aya:hover {
    background-color: #eef9f6;
}
.aya span {
    font-size: 20px;
}
</style>