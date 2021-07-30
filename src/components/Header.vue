<template>
    <header>
        <div class="header-inner">
            <div class="first-part-header">
                <div class="menu">
                    <img src="./assets/img/hamburger.svg" alt />
                </div>
                <router-link to='/'>قرآن کریم</router-link>
            </div>
            <div class="t-selector">
                <span>ترجمه</span>
                <select class="t-select" name="locale">
                    <option value="fa">انصاریان</option>
                    <option value="en">ملکی</option>
                    <option value="en">مکارم</option>
                </select>
            </div>
        </div>
    </header>
</template>

<style scoped>
header {
    background-color: #fff;
    left: 0;
    right: 0;
    top: 0;
    position: fixed;
    box-shadow: 0 1px 0 0 #e1e1e4;
    z-index: 9;
}
a {
    text-decoration: none;
}
header a {
    color: #000;
}

.header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 45px;
    padding: 0 15px;
    margin: 0 auto;
}

.first-part-header {
    display: flex;
    align-items: center;
}

.menu {
    margin-left: 20px;
    cursor: pointer;
}

.t-select {
    border: 1px solid cadetblue;
    border-radius: 4px;
    cursor: pointer;
    color: #00acc2;
    background-color: transparent;
    position: relative;
    margin-right: 10px;
}
</style>