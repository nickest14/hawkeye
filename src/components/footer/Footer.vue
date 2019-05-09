<template>
  <footer class="footer fixed-bottom mt-auto py-3">
    <div class="container">
      <span class="text-muted">Produced By Nick</span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang='scss' scoped>
@import "@/styles/variables.scss";

.footer > container {
  width: auto;
  padding: 0 15px;
}
.text-muted {
  color: $footer_text!important;
  font-size: 18px;
}
.footer {
  background-image: $footer_bg
}
</style>
