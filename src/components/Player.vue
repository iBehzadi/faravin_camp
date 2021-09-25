<template>
    <div class="player">
        <div class="player__control">
            <button>
                <span class="icon-next2"></span>
            </button>
            <button class="play">
                <span class="icon-play3"></span>
            </button>
            <button class="stop p-hide">
                <span class="icon-pause2"></span>
            </button>
            <button>
                <span class="icon-previous2"></span>
            </button>
        </div>

        <!-- <audio ref="audioElement" id="audio" controls>
            <source type="audio/mp3">
            مرورگر شما از فایل صوتی پشتیبانی نمی کند.
        </audio> -->
    </div>
</template>

<script lang="ts">
//import { ref } from 'vue'
export default {

    setup() {
        //let audioElement = ref<HTMLAudioElement>();
        
        return {


        }
    }
};
</script>

<style lang="scss" scoped>
@import url("../assets/icon-style.css");
.player {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    border-top: 1px solid cornflowerblue;
    background-color: #f3f3f4;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    &__control {
        button {
            border-radius: 100%;
            margin: 0 5px;
            cursor: pointer;
            border: none;
        }
        span {
            display: flex;
            justify-content: center;
            color: #000;
            font-size: 2rem;
            &:hover {
                color: #00ccc2;
            }
        }
    }
}
.p-hide {
    display: none;
}
</style>