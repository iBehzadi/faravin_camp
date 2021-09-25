
<template>
    <!-- navbar items -->
    <div class="navbar">
        <span class="icon-menu" @click="openNav"></span>

        <div class="navbar__trs-selector">
            <span>مترجم</span>
            <select @change="translatorChanger" class="selection-menu" v-model="translateSelector">
                <option value="ansarian">انصاریان</option>
                <option value="maleki">ملکی</option>
                <option value="makarem">مکارم</option>
            </select>
        </div>
    </div>

    <!-- setting side menu -->
    <div ref="settingNav" id="setting-nav" class="settings">
        <a href="javascript:void(0)" class="settings__closebtn" @click="closeNav">x</a>
        <p>اندازه فونت</p>
        <div class="settings__fontsize">
            <span>عربی</span>
            <select class="selection-menu" @change="ayaFontSizeChange" v-model="ayaFontSize">
                <option value="18">18</option>
                <option value="20">20</option>
                <option value="22">22</option>
                <option value="24">24</option>
                <option value="26">26</option>
                <option value="28">28</option>
                <option value="30">30</option>
                <option value="32">32</option>
                <option value="34">34</option>
            </select>
            <span>ترجمه</span>
            <select class="selection-menu" @change="trsFontSizeChange" v-model="trsFontSize">
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

        <div class="settings__fontfamily">
            <span>قلم</span>
            <select class="selection-menu" @change="fontChanger" v-model="fontSelector">
                <option value="Yekan">یکان</option>
                <option value="Vazir">وزیر</option>
            </select>
        </div>
        <div class="settings__ghari">
            <span>قاری</span>
            <select class="selection-menu">
                <option value="ansarian">منشاوی</option>
                <option value="maleki">خلیل الحصری</option>
            </select>
        </div>
    </div>

    <!-- content of sura -->
    <section class="sura-content">
        <span>سوره {{ position.name }}</span>
        <br />
        <span>محل نزول : {{ position.mecOrMed }}</span>
        <br />
        <div class="sura-content__aya nopadding">
            <span
                :style="{ fontSize: store.state.ayaFontSize + 'px', fontFamily: store.state.textFontFamily }"
                v-if="position.name != 'الفاتحة'"
            >بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ</span>
        </div>
        <div
            class="sura-content__aya"
            :style="{ fontSize: store.state.ayaFontSize + 'px', fontFamily: store.state.textFontFamily }"
            v-for="(aya, i) in ayasText"
            :key="i"
        >
            <div class="sura-content__context">
                <span
                    class="sura-content__copy icon-copy"
                    @click="copyAya(aya, ayaTranslateText[i])"
                ></span>
                <span class="sura-content__play icon-play3" @click="playAudio(i)"></span>
                <span class="sura-content__play icon-pause2 hide" @click="pauseAudio(i)"></span>
                <span
                    class="sura-content__share icon-share2"
                    @click="shareText(aya, position.name, i, ayaTranslateText[i])"
                ></span>
            </div>

            <span>({{ aya }}).{{ i + 1 }}</span>

            <br />
            <span
                class="sura-content__trs"
                :style="{ fontSize: store.state.trsFontSize + 'px' }"
            >{{ ayaTranslateText[i] }}</span>
        </div>
    </section>
    <div class="sura-changer">
        <button class="sura-changer__before button" @click="beforeSura">سوره قبل</button>
        <button class="sura-changer__next button" @click="nextSura">سوره بعد</button>
    </div>
    <Player></Player>
</template>

<script lang="ts">

import { computed, inject, ref } from "@vue/runtime-core";
import { SuraList } from "../qdata";
import { ansarian } from "../assets/tarjomeh/ansarian"
import { maleki } from "../assets/tarjomeh/maleki"
import { makarem } from "../assets/tarjomeh/makarem"
import { ayat } from "../qtext";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Player from "../components/Player.vue"
import router from "../router";


export default {
    components: {
        Player,
    },
    setup() {
        const route = useRoute();
        const store = useStore();
        const toast = inject("WKToast");
        const pushMessage = (msg: string) => {
            //@ts-ignore
            toast(msg);
        };

        let ayaList = ayat.split('\n');
        var settingNav = ref<HTMLDivElement>();
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

        //text compute
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

        let ayasText = computed(() => {
            let aya = ayaList.slice(position.value.start, position.value.end);
            aya[0] = aya[0].replace('بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ ', '')
            return aya;
        })

        ayaTranslateText = computed(() => ayaTranslate.value.slice(position.value.start, position.value.end))

        //setting menu functions
        function openNav() {
            settingNav.value!.style.width = "250px";
        }
        function closeNav() {
            settingNav.value!.style.width = "0";
        }
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

        //sura change functions
        function nextSura() {
            let next: number = +route.params.id
            next++
            if (next >= 114) {
                next = 114
            }
            router.push({ name: 'showSuraContent', params: { id: `${next}` } });
        }
        function beforeSura() {
            let before: number = +route.params.id
            before++
            if (before <= 0) {
                before = 1
            }
            router.push({ name: 'showSuraContent', params: { id: `${before}` } });
        }

        //audio player // notwork!!
        function playAudio(i: number) {
            //audioSrc.value = `https://www.everyayah.com/data/AbdulSamad_64kbps_QuranExplorer.Com/00100${i + 1}.mp3`;
        }
        function pauseAudio(i: number) {

        }
        //sharing and copy functions
        async function shareText(aya: string, name: string, number: number, translate: string) {
            let shareData = {
                title: 'QuranApp',
                text: `(سوره ${name} آیه ${number + 1})\n ${aya} : ${translate}`,
            }
            try {
                await navigator.share(shareData)
            } catch (err) {
                console.log('sharing got error :' + err);
            }
        }
        function copyAya(aya: string, trs: string) {
            try {
                navigator.clipboard.writeText(aya + "/" + trs);
                pushMessage("آیه کپی شد");
            } catch {
                postMessage("انجام نشد!")
            }

        }
        //wakelock
        let wakeLock: any = null;
        // request a screen wake lock.
        const requestWakeLock = async () => {
            try {
                wakeLock = await (navigator as any).wakeLock.request();
                wakeLock.addEventListener('release', () => {
                    console.log('Screen Wake Lock released?:', wakeLock.released);
                });
                console.log('Screen Wake Lock released:', wakeLock.released);
            } catch (err) {
                console.error(err);
            }
        };

        // Request a screen wake lock…
        requestWakeLock();

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
            ayaFontSize,
            trsFontSize,
            trsFontSizeChange,
            ayaFontSizeChange,
            nextSura,
            beforeSura,
            settingNav,
            pushMessage

        }
    }
}
</script>

<style lang="scss" scoped>
@import url("../assets/icon-style.css");
@import url("../style/base.scss");

.sura-changer {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-evenly;
}
.navbar {
    height: 45px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f3f3f4;
    position: sticky;
    top: 45px;
    z-index: 8;
    &__trs-selector {
        margin-left: 10px;
    }
    .icon-menu {
        font-size: 30px;
        cursor: pointer;
        margin-right: 10px;
    }
    .icon-menu:hover {
        color: blue;
    }
}
.settings {
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
    &__fontsize {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin: 0 20px;
    }
    &__closebtn {
        position: absolute;
        top: 0;
        left: 10px;
        font-size: 36px;
    }
    &__fontfamily {
        margin-top: 20px;
    }
    &__ghari {
        margin-top: 20px;
    }
    span {
        font-size: 18px;
    }
    p {
        right: 0;
        font-weight: 600;
        font-size: 18px;
    }
    button {
        background-color: #fbfbfb;
        border: 1px solid #dadbde;
        cursor: pointer;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        color: #999aa2;
    }
}
.sura-content {
    margin-top: 60px;
    &__aya {
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
    .context {
        position: absolute;
        cursor: pointer;
    }
    &__trs {
        font-size: 18px;
    }
    &__copy {
        @extend .context;
        left: 5px;
        top: 5px;
        &:hover {
            color: blue;
        }
    }
    &__play {
        @extend .context;
        left: 35px;
        top: 5px;
        &:hover {
            color: blue;
        }
    }
    &__share {
        @extend .context;
        left: 65px;
        top: 5px;
        &:hover {
            color: blue;
        }
    }
}
@media screen and (max-height: 450px) {
    .settings {
        padding-top: 15px;
    }
}
</style>