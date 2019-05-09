<template>
  <nav class="navbar navbar-expand-md fixed-top bg-color">
    <a class="navbar-brand">
      <router-link to="/" style="cursor: pointer">
        <logo></logo>
      </router-link>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <a class="nav-link">
            <router-link :to="{ name: 'Home'}" style="cursor: pointer">about us</router-link>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link">
            <router-link :to="{ name: 'Menu'}" style="cursor: pointer">menu</router-link>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link">
            <router-link :to="{ name: 'User'}" style="cursor: pointer">user</router-link>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link">
            <router-link :to="{ name: 'Login'}" style="cursor: pointer">login</router-link>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import Logo from '@/components/Logo'
export default {
  name: 'Header',
  components: {
    Logo
  }
}
</script>

<style lang='scss' scoped>
  @import "@/styles/variables.scss";
  @import "@/styles/element-ui.scss";
  .bg-color {
    background-color: $azul;
  }

  .nav-link a {
    color: $whitesmoke;
    font-size: 20px;
  }

  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255,255,255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
  }
</style>
