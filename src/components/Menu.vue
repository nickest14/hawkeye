<template>
  <div class="content-container">
    <h1>{{ title }}</h1>
    <h1>hello menu!!!!!!!!!!!!!!</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'In the menu'
    }
  }
}
</script>
