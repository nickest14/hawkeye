<template>
  <div class="logo-header">
    <div id="logo">
      <img src="@/assets/logo.png" alt="Logo">
      <span>進發</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

img {
  border: none;
}
span {
  color: $whitesmoke;
  font-size: 20px;
}
span:hover {
  color: $primary-color;
}
#logo img {
  margin-right: 5px;
  width: 40px;
  height: 40px;
}
</style>
