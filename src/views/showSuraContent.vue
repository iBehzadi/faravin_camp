
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
            <div class="fsize">
                <span>عربی</span>
                <select class="t-select" @change="ayaFontSizeChange" v-model="ayaFontSize">
                    <option value="14">14</option>
                    <option value="16">16</option>
                    <option value="18">18</option>
                    <option value="20">20</option>
                    <option value="22">22</option>
                    <option value="24">24</option>
                    <option value="26">26</option>
                    <option value="28">28</option>
                    <option value="30">30</option>
                </select>
                <span>ترجمه</span>
                <select class="t-select" @change="trsFontSizeChange" v-model="trsFontSize">
                    <option value="14">14</option>
                    <option value="16">16</option>
                    <option value="18">18</option>
                    <option value="20">20</option>
                    <option value="22">22</option>
                    <option value="24">24</option>
                    <option value="26">26</option>
                    <option value="28">28</option>
                    <option value="30">30</option>
                </select>
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
        <span>سوره {{ position.name }}</span>
        <br />
        <span>محل نزول : {{ position.mecOrMed }}</span>
        <br />
        <div class="ayas">
            <span
                :style="{ fontSize: store.state.ayaFontSize + 'px', fontFamily: store.state.textFontFamily }"
                v-if="position.name != 'الفاتحة'"
            >بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ</span>
        </div>
        <div
            class="ayas"
            :style="{ fontSize: store.state.ayaFontSize + 'px', fontFamily: store.state.textFontFamily }"
            v-for="(aya, i) in ayasText"
            :key="i"
        >
            <span class="copy icon-copy" @click="copyAya(aya, ayaTranslateText[i])"></span>

            <span class="play icon-play3" @click="playAudio(i)"></span>
            <span class="play icon-pause2 hide" @click="pauseAudio(i)"></span>
            <span
                class="share icon-share2"
                @click="shareText(aya, position.name, i, ayaTranslateText[i])"
            ></span>
            <span class="aya">({{ aya }}).{{ i + 1 }}</span>

            <br />
            <span
                class="trs"
                :style="{ fontSize: store.state.trsFontSize + 'px' }"
            >{{ ayaTranslateText[i] }}</span>
        </div>
    </section>

    <Player ref="player" :source="audioSrc"></Player>
</template>

<script lang="ts">

import { computed, ref } from "@vue/runtime-core";
import { SuraList } from "../qdata";
import { ansarian, makarem, maleki } from "../assets/tarjomeh/fa.translate"
import { ayat } from "../qtext";
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
        const player = ref();
        let ayaList = ayat.split('\n');
        var audioSrc = ref('');
        let ayaTranslateText;
        let translateSelector = ref(store.state.translator);
        let fontSelector = ref(store.state.textFontFamily);
        let ayaFontSize = ref(store.state.ayaFontSize);
        let trsFontSize = ref(store.state.trsFontSize);
        let ayaTranslate = computed(() => {
            if (store.state.translator === 'ansarian') {
                return ansarian.split('\n')
            } else if (store.state.translator === 'maleki') {
                return maleki
            } else {
                return makarem.split('\n')
            }
        })


        function translatorChanger() {
            store.dispatch('changeT', translateSelector.value);
            localStorage.setItem('translator', `${translateSelector.value}`);
        }
        function fontChanger() {
            store.dispatch('changeF', fontSelector.value);
            localStorage.setItem('fontFamily', `${fontSelector.value}`);
        }
        function ayaFontSizeChange() {
            store.dispatch('ayaFontChange', ayaFontSize.value);
            localStorage.setItem('ayaFontSize', `${ayaFontSize.value}`);
        }
        function trsFontSizeChange() {
            store.dispatch('trsFontChange', trsFontSize.value);
            localStorage.setItem('trsFontSize', `${trsFontSize.value}`);
        }
        let position = computed(() => {
            let sura = SuraList[+route.params.id - 1];
            let start = sura[0];
            let name = sura[4];
            let mecOrMed, temp = sura[7];
            if (temp == "Meccan") {
                mecOrMed = "مکه";
            } else {
                mecOrMed = "مدینه";
            }
            let end = start + sura[1];
            return { start, end, name, mecOrMed }
        })

        function copyAya(aya: string, trs: string) {
            navigator.clipboard.writeText(aya + "/" + trs);

        }

        let ayasText = computed(() => {
            let aya = ayaList.slice(position.value.start, position.value.end);
            aya[0] = aya[0].replace('بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ ', '')
            return aya;
        })

        ayaTranslateText = computed(() => ayaTranslate.value.slice(position.value.start, position.value.end))

        function openNav() {
            document.getElementById("setting-nav")!.style.width = "250px"
        }

        function closeNav() {
            document.getElementById("setting-nav")!.style.width = "0";
        }

        //editing need
        function playAudio(i: number) {
            audioSrc.value = `https://www.everyayah.com/data/AbdulSamad_64kbps_QuranExplorer.Com/00100${i + 1}.mp3`;

        }
        function pauseAudio(i: number) {

        }

        //sharing aya
        async function shareText(aya: string, name: string, number: number, translate: string) {
            let shareData = {
                title: 'QuranApp',
                text: `(سوره ${name} آیه ${number + 1})\n ${aya} : ${translate}`,
            }
            try {
                await navigator.share(shareData)
                console.log('success')
            } catch (err) {
                console.log(err)
            }
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
            fontSelector,
            fontChanger,
            position,
            playAudio,
            pauseAudio,
            shareText,
            audioSrc,
            ayaFontSize,
            trsFontSize,
            trsFontSizeChange,
            ayaFontSizeChange

        }
    }
}
</script>

<style scoped>
@import url("../assets/icon-style.css");
@import url("../style/base.scss");
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
    font-size: responsive;
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
.share,
.copy,
.play {
    position: absolute;
    cursor: pointer;
}
.ayas .copy {
    left: 5px;
    top: 5px;
}
.hide {
    display: none;
}
.ayas .play {
    left: 35px;
    top: 5px;
}
.ayas .icon-copy:hover,
.play:hover {
    color: blue;
}

.share {
    left: 65px;
    top: 5px;
}

.sidenav {
    height: 30%;
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
    justify-content: space-around;
    margin: 0 20px;
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