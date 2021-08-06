<template>
    <div class="setting-container">
        <span class="icon-menu" @click="openNav"></span>
        <div class="t-selector">
            <span>مترجم</span>
            <select @change="translatorChanger" class="t-select" v-model="translateSelector">
                <option value="ansarian">انصاریان</option>
                <option value="maleki">ملکی</option>
                <option value="makarem">مکارم</option>
            </select>
        </div>
    </div>

    <div id="setting-nav" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" @click="closeNav">x</a>
        <p>اندازه فونت</p>
        <div class="counter">
            <div class="fsize">
                <button @click="store.dispatch('ayaFontInc')">+</button>
                <span>عربی</span>
                <button @click="store.dispatch('ayaFontDec')">-</button>
            </div>
            <div class="fsize">
                <button @click="store.dispatch('trsFontInc')">+</button>
                <span>ترجمه</span>
                <button @click="store.dispatch('trsFontDec')">-</button>
            </div>
            
        </div>
        <div class="text-font">
                <span>فونت</span>
                <select class="t-select" @change="fontChanger" v-model="fontSelector">
                    <option value="Yekan">یکان</option>
                    <option value="Vazir">وزیر</option>
            </select>
        </div>
        <div class="ghari">
            <span>قاری</span>
            <select class="t-select">
                    <option value="ansarian">منشاوی</option>
                    <option value="maleki">خلیل الحصری</option>
            </select>
        </div>
        
    </div>

    <section class="sura-container">
        <div class="ayas" :style="{'font-size': store.state.ayaFontSize + 'px', 'font-family': store.state.textFontFamily }" v-for="(aya, i) in ayasText" :key="i">
            <span class="copy icon-copy" @click="copyAya(aya, ayaTranslateText[i])"></span>
            <span class="play icon-play3"></span>
            <span class="play icon-pause2 hide"></span>
            <span class="aya">({{ aya }}).{{  i + 1  }}</span>
            
            <br />
            <span class="trs" :style="{'font-size': store.state.trsFontSize + 'px' }" >{{ ayaTranslateText[i] }}</span>
        </div>
    </section>

    <Player></Player>
</template>

<script lang="ts">

import { computed, ref } from "@vue/runtime-core";
import { SuraList } from "../qdata";
//@ts-ignore
import * as quranTranslate from "../assets/tarjomeh/fa.translate"
//@ts-ignore
import * as quranText from "../qtext";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Player from "../components/Player.vue"


export default {
    components: {
        Player,
    },
    setup() {

        const route = useRoute();
        const store = useStore();
        let ayaList = quranText.ayat.split('\n');
        let ayasText, ayaTranslateText;
        let translateSelector = ref(store.state.translator);
        let fontSelector = ref(store.state.textFontFamily);
        
        //let tname = computed(() => store.state.translator)

        let ayaTranslate = computed(()=> {
            if(store.state.translator === 'ansarian') {
                return quranTranslate.ansarian.split('\n')
            } else if (store.state.translator === 'maleki') {
                return quranTranslate.maleki
            } else {
                return quranTranslate.makarem.split('\n')
            }
        })

        //let ayaTranslate = computed(()=> quranTranslate.ansarian.split('\n'))
        function translatorChanger() {
            store.dispatch('changeT', translateSelector.value);
        }
       function fontChanger(){
           store.dispatch('changeF', fontSelector.value);
       }
        let position = computed(()=> {
            let sura = SuraList[route.params.id - 1];
            let start = sura[0];
            let name = sura[4];
            let end = start + sura[1];
            return {start, end}
        })

        function copyAya(aya: string, trs: string) {
            navigator.clipboard.writeText(aya + "/" + trs);

        }

        ayasText = computed(() => {
            let aya = ayaList.slice(position.value.start, position.value.end);
            aya[0] = aya[0].replace('بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ ', '')
            return aya;
        })

        ayaTranslateText = computed(()=> ayaTranslate.value.slice(position.value.start, position.value.end))

        function openNav() {
            document.getElementById("setting-nav").style.width = "250px";
        }

        function closeNav() {
            document.getElementById("setting-nav").style.width = "0";
        }



        return {
            ayasText,
            ayaTranslateText,
            copyAya,
            translateSelector,
            translatorChanger,
            openNav,
            closeNav,
            store,
            ayaTranslate,
            fontSelector,
            fontChanger
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f3f3f4;
    position: sticky;
    top: 48px;
    z-index: 8;
}
.t-selector {
    margin-left: 10px;
}
.t-select {
    border: 1px solid cadetblue;
    border-radius: 4px;
    cursor: pointer;
    color: #000;
    background-color: #fff;
    position: relative;
    margin-right: 10px;
    font-family: Yekan, Helvetica, Arial, sans-serif;
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
}
.hide {
    display: none;
}
.ayas .play {
    position: absolute;
    left: 35px;
    top: 5px;
    cursor: pointer;
}
.ayas .icon-copy:hover,.play:hover {
    color: blue;
}
.sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 8;
    top: 0;
    right: 0;
    margin-top: 40px;
    background-color: #fff;
    overflow-x: hidden;
    transition: 0.3s;
    padding-top: 60px;
}

.sidenav span {
    padding: 0 5px;
    font-size: 18px;
}
.sidenav p {
    right: 0;
    font-weight: 600;
    font-size: 18px;
}

.sidenav .closebtn {
    position: absolute;
    top: 0;
    left: 10px;
    font-size: 36px;
}
.icon-menu {
    font-size: 30px;
    cursor: pointer;
    margin-right: 10px;
}
.icon-menu:hover {
    color: blue;
}
.fsize {
    display: flex;
    align-items: center;
    margin: 0 10px;
}
.counter {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    
}
.ghari {
    margin-top: 20px;
}
.text-font {
    margin-top: 20px;
}
.sidenav button {
    background-color: #fbfbfb;
    border: 1px solid #dadbde;
    cursor: pointer;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    color: #999aa2;

}
@media screen and (max-height: 450px) {
    .sidenav {
        padding-top: 15px;
    }
    
}
</style>