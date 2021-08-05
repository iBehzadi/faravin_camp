<template>
    <header>
        <div class="header-inner">
            <div class="logo-header">
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
    z-index: 9;
    
}

header a {
    text-decoration: none;
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



</style>