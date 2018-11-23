<!--App.vue是项目入口文件。-->
<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style>
    body{
        padding:0;
        margin: 0;
    }
    #app{
        height:100vh;
        padding:0;
    }
</style>

