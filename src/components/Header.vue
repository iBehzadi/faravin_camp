<template>
    <header>
        <div class="header-inner">
            <div class="first-part-header">
                <router-link to='/'>قرآن کریم</router-link>
            </div>
        </div>
    </header>
</template>

<script lang="ts">

export default {
    
}
</script>

<style scoped>

header {
    background-color: #00ccc2;
    left: 0;
    right: 0;
    top: 0;
    position: fixed;
    box-shadow: 0 1px 1px 2px #e1e1e4;
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


</style>