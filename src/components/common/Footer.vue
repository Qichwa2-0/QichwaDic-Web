<template>
  <footer class="footer default text-center">
    <div class="col-10 mx-auto">
      <p class="mt-3">
        <span class="text-primary"><strong>Qichwa 2.0</strong></span> |
        <router-link to="/dictionaries">
          {{$t('footer.dictSourcesLink')}}
        </router-link>
      </p>
      <p class="text-primary">
        &copy; 2017-{{currentYear}}
        <a href="https://www.qichwa.net" rel="noreferrer noopener" target="_blank"> <strong>Qichwa 2.0</strong></a>
        <br/>
      </p>
      <p class="footer-icons">
        <a href="https://www.facebook.com/qichwa2.0" target="_blank" rel="noopener noreferrer">
          <icon name="brands/facebook-f"/>
        </a>
        <a href="https://www.youtube.com/channel/UCZ5kIwvo7DlN9qdrQrjUOkg" target="_blank" rel="noopener noreferrer">
          <icon name="brands/youtube"/>
        </a>
        <a href="mailto:qichwa2.0@gmail.com">
          <span role="button"><icon name="envelope"/></span>
        </a>
        <a class="support-link" :href="this.supportLink" target="_blank" rel="noopener noreferrer">
          <icon name="heart" scale="1"/> {{ $t('footer.supportUs') }}
        </a>
      </p>
    </div>
  </footer>

</template>

<script>
  import Icon from 'vue-awesome/components/Icon'
  import 'vue-awesome/icons/brands/facebook-f'
  import 'vue-awesome/icons/brands/twitter'
  import 'vue-awesome/icons/brands/youtube'
  import 'vue-awesome/icons/envelope'
  import 'vue-awesome/icons/heart'

  export default {
    name: 'foot',
    data() {
      return {
        currentYear: new Date().getFullYear()
      }
    },
    components: { 'icon': Icon },
    computed: {
        supportLink() {
            switch(this.$i18n.locale) {
                case 'es': return 'https://www.qichwa.net/apoyanos';
                case 'qus': return 'https://www.qichwa.net/qu/yanapawayku';
                default: return 'https://www.qichwa.net/en/support-us';
            }
        },
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
</style>
