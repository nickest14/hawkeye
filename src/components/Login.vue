<template>
  <div class="content-container">
    <h1>The login Page</h1>
    <hr>
    <button @click="test2" class="btn btn-primary">Call API</button>
    <hr>
    <button @click="navigateToHome" class="btn btn-primary">Go to Home</button>
    <router-view></router-view>
  </div>
</template>

<script>
import { fetchtest } from '../api'
export default {
  methods: {
    navigateToHome () {
      this.$router.push({ name: 'Home' })
    },
    test () {
      console.log('hahaaha')
      fetchtest(this.user).then(res => {
        console.log(res)
      }, errorMsg => {
        console.log(errorMsg)
      })
    },
    test2 () {
      this.recordLoading = true
      fetchtest().then(data => {
      }).catch(errorMsg => {
        console.log('catch')
        console.log(errorMsg)
        this.$message({
          showClose: false,
          message: errorMsg.data,
          type: 'error'
        })
      }).finally(() => {
        console.log('Finally')
      })
    }
  }
}
</script>
