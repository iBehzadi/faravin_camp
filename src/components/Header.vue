<template>
    <header class="header">
        <div class="header__items">
            <div class="header__logo">
                <span to="/">قرآن کریم</span>
            </div>
            <div class="header__homepage">
                <router-link to="/">
                    <span class="header__text">صفحه اصلی</span>
                    <i class="icon-home"></i>
                </router-link>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@import url("../assets/icon-style.css");
.header {
    background-color: #00ccc2;
    left: 0;
    right: 0;
    top: 0;
    position: fixed;
    z-index: 9;
    &__logo {
        font-weight: 700;
    }
    &__items {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 45px;
        padding: 0 15px;
        margin: 0 auto;
    }
    i {
        font-size: 25px;
        &:hover {
            color: blue;
        }
    }
    
}
</style>