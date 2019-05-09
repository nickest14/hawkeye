<template>
  <div id="app">
    <Header />
    <!-- <router-view name="header-top"></router-view> -->
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
export default {
  name: 'app',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
