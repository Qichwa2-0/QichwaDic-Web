<template>
  <footer class="footer default text-center">
    <div class="col-xs-10 col-xs-offset-1">
      <p class="margin-top-xxl">
        <span class="text-default">{{ $t("footer.createdBy") }} <strong>Qichwa 2.0</strong></span> |
        <router-link to="/dictionaries">
          {{$t('footer.dictSourcesLink')}}
        </router-link>
      </p>
      <p class="text-default">
        &copy; 2017-2018 {{ $t("footer.developedBy") }} <a href="https://www.qichwa.net" rel="noreferrer noopener" target="_blank"><strong>Qichwa 2.0</strong></a>
        <br/>
      <p class="footer-icons">
        <a href="https://www.facebook.com/qichwa2.0" target="_blank" rel="noopener noreferrer">
          <icon name="facebook-f"></icon>
        </a>
        <a href="https://twitter.com/Qichwa20" target="_blank" rel="noopener noreferrer">
          <icon name="twitter"></icon>
        </a>
        <a href="https://www.youtube.com/channel/UCZ5kIwvo7DlN9qdrQrjUOkg" target="_blank" rel="noopener noreferrer">
          <icon name="youtube"></icon>
        </a>
        <a href="mailto:qichwa2.0@gmail.com"><span role="button"><icon name="envelope"></icon></span></a>
      </p>
    </div>
  </footer>

</template>

<script>
  import Icon from 'vue-awesome/components/Icon'
  import 'vue-awesome/icons/facebook-f'
  import 'vue-awesome/icons/twitter'
  import 'vue-awesome/icons/youtube'
  import 'vue-awesome/icons/envelope'

  export default {
    name: 'foot',
    components: { 'icon': Icon }
  }
</script>
<style lang="scss">
  p.footer-icons{
    &>*{
      margin: 1px 7px;
    }
    a{
      color: inherit;
    }
  }
</style>
