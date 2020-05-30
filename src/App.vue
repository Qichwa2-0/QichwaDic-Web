<template>
  <div id="app">
    <router-view/>
    <foot/>
  </div>
</template>

<script>
  import Footer from './components/common/Footer'
  export default {
    name: 'app',
    components: {
      'foot': Footer
    }
  }
</script>
<style lang="scss">
  @import '~bootswatch/dist/flatly/variables';
  @import '~bootstrap/scss/bootstrap';
  @import '~bootswatch/dist/flatly/bootswatch';

  $footerHeight : 120px;
  $footer-link-color: #154257;

  html{
    position: relative;
    min-height: 100%;
  }

  .body-fixed-footer{
    margin-bottom: $footerHeight;
  }

  .footer{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: $footerHeight;
    background-color: white;
    &.inverse{
      background-color: $navbar-light-color;
    }
  }

  .footer-link{
    color: $footer-link-color;
  }

  .text-white{
    color: white;
  }

  $margins: (xs: 0.5rem, sm: 1rem, md: 1.5rem, lg: 2rem, xl: 2.5rem, xxl: 3rem);

  @each $name, $value in $margins {
    .margin-top-#{$name} {
      margin-top: $value;
    }

    .margin-bottom-#{$name} {
      margin-bottom: $value;
    }

    .margin-left-#{$name} {
      margin-left: $value;
    }

    .margin-right-#{$name} {
      margin-right: $value;
    }
  }

  .text-main-title{
    color: rgb(168, 32, 79);
  }

  $sides: ("left", "top", "right", "bottom");

  @each $side in $sides {
    .no-padding-#{$side} {
      padding-#{$side}: 0px !important;
    }
  }

  .navbar .container{
    width: 100%;
  }

  .vcenter{
    vertical-align: middle;
  }

  .col-centered{
    float: none;
    margin: 0 auto;
  }

  .cursor-default{
    cursor: default;
  }

  .cursor-pointer{
    cursor: pointer;
  }

  img.logo {
    height: 10em;
    width: auto;
  }

  img.logo-small {
    height: 3em;
    width: auto;
  }

  .spinner-container {
    display: flex;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 9998;
    background: rgba(255, 255, 255, 0.9);
  }
    
</style>
