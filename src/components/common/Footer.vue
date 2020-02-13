<template>
  <footer class="footer default text-center">
    <div class="col-xs-10 col-xs-offset-1">
      <p class="margin-top-xxl">
        <span class="text-default"><strong>Qichwa 2.0</strong></span> |
        <router-link to="/dictionaries">
          {{$t('footer.dictSourcesLink')}}
        </router-link>
      </p>
      <p class="text-default">
        &copy; 2017-2020
        <a href="https://www.qichwa.net" rel="noreferrer noopener" target="_blank"><strong>Qichwa 2.0</strong></a>
        <br/>
      </p>
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
        <a href="mailto:qichwa2.0@gmail.com">
          <span role="button"><icon name="envelope"></icon></span>
        </a>
        <a class="support-link" :href="this.supportLink" target="_blank" rel="noopener noreferrer">
          <icon name="heart" scale="1"/> {{ $t('footer.supportUs') }}
        </a>
      </p>
    </div>
    <a class="btn pull-right margin-right-md support-button" :href="this.supportLink" target="_blank" rel="noopener noreferrer">
         {{ $t('footer.supportUs') }} <icon name="heart" scale="1"/>
     </a>
  </footer>

</template>

<script>
  import Icon from 'vue-awesome/components/Icon'
  import 'vue-awesome/icons/facebook-f'
  import 'vue-awesome/icons/twitter'
  import 'vue-awesome/icons/youtube'
  import 'vue-awesome/icons/envelope'
  import 'vue-awesome/icons/heart'

  export default {
    name: 'foot',
    components: { 'icon': Icon },
    computed: {
        supportLink() {
            switch(this.$i18n.locale) {
                case 'es': return 'https://www.qichwa.net/apoyanos';
                case 'qus': return 'https://www.qichwa.net/qu/yanapawayku';
                default: return 'https://www.qichwa.net/en/support-us';
            }
        }
    }
  }
</script>
<style lang="scss">
  p.footer-icons {
    & >* {
      margin: 1px 7px;
    }
    a:not(.support-link) {
      color: inherit;
    }
  }
  .support-button {
    position: fixed;
    right: 0;
    bottom: 10px;
    color: white;
    background-color: darkgreen;
  }
  
  @media (max-width: 576px) {
    .support-button {
      display: none !important;
    }
  }
  
  @media (min-width: 576px) {
    .support-link {
      display: none !important;
    }
  }
</style>
