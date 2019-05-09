<template>
  <div class="content-container">
    <h1>The User Page</h1>
    <hr>
    <button @click="navigateToHome" class="btn btn-primary">Go to Home</button>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    navigateToHome () {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>
