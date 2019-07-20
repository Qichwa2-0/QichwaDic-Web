<template>
  <div class="container-fluid body-fixed-footer">
    <div class="row margin-top-md">
      <div class="col-xs-12 ">
        <div class="pull-left">
          <router-link to="/">
            <a class="form-control"><icon name="arrow-left" scale="1.1"></icon></a>
          </router-link>
        </div>
        <div class="pull-right">
          <v-select id="select-language"
                    class="language-selector cursor-pointer"
                    v-model="$i18n.locale"
                    :options="languages"
                    options-value="code"
                    options-label="name"
                    justified
                    close-on-select>
          </v-select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <router-link to="/">
          <img class="img-responsive center-block logo" src="/img/qichwa20-logo.png" alt="Qichwa 2.0">
        </router-link>
      </div>
    </div>
    <div class="row">
      <section class="col-xs-10 col-centered">
        <h1 class="text-center">{{ $t("main.availableDictionaries") }}</h1>
        <p class="text-center margin-top-xl">
          <i18n path="dictionarySection.mainText">
            <strong>Asociación ILLA</strong>
            <a href="http://runasimi.de" target="_blank" rel="noreferrer noopener">
              <strong>Runasimi.de</strong>
            </a>
            <a href="https://www.qichwa.net" target="_blank" rel="noreferrer noopener">
              <strong>Qichwa 2.0</strong>
            </a>
          </i18n>
          <br>
          <strong>{{ $t('dictionarySection.thanks') }}</strong>
        </p>
      </section>
    </div>
    <div class="row margin-top-md">
      <div class="col-xs-6 col-sm-4 col-centered text-center">
        <spinner ref="spinner" v-model="spinner" size="lg" fixed :text="$t('result.pleaseWait')"></spinner>
        <v-select id="select-dict-type"
                  class="btn-block v-select text-center"
                  :options="langOptions"
                  options-label="name"
                  options-value="code"
                  v-model="dictionaryType">
        </v-select>
      </div>
    </div>
    <div class="row margin-top-lg">
      <div class="col-xs-12 col-sm-10 col-centered">
        <div id="dictionaries-container">
          <div v-for="(dictionary) in currentDictionaries"
               class="panel panel-primary dictionary-item"
               :key="dictionary.id"
               :class="currentDictionaries.length === 1 ? 'single' : ''">
            <div class="panel-heading"> {{ dictionary.name }} </div>
            <div class="panel-body">
              <p><strong>{{ $t("dictionarySection.author") }}</strong> {{ dictionary.author }}</p>
              <p><strong>{{ $t("dictionarySection.description") }}</strong> {{ dictionary.description }}</p>
              <p><strong>{{ $t("dictionarySection.totalEntries") }}</strong> {{ dictionary.totalEntries }}</p>
              <p><strong>{{ $t("dictionarySection.compilator") }} </strong>
                <a v-if="dictionary.compilator.url !== '#'"
                   :href="dictionary.compilator.url"
                   target="_blank"
                   rel="noreferrer noopener">
                  {{ dictionary.compilator.name }}
                </a>
                <strong v-else>{{ dictionary.compilator.name }}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {select, spinner} from 'vue-strap'
  import Icon from 'vue-awesome/components/Icon'
  import 'vue-awesome/icons/home'
  import 'vue-awesome/icons/arrow-left'

  export default {
    name: 'DictionaryStats',
    components: { 'v-select': select, 'icon': Icon, spinner },
    data: function () {
      return {
        dictionaries: {},
        languages: [
          {code: 'es', name: 'Español'},
          {code: 'qus', name: 'Urin qichwa'},
          {code: 'en', name: 'English'},
          {code: 'de', name: 'Deutsch'},
          {code: 'fr', name: 'Français'},
          {code: 'cs', name: 'Čeština'}
        ],
        dictionaryType: 'all',
        allDictionaries: [],
        spinner: false
      }
    },
    created () {
      this.spinner = true
      this.checkLocale()
      this.$store.dispatch('dictionaryModule/fetchDictionaries').then(() => this.spinner = false)
    },
    computed: {
      currentDictionaries() {
        if (this.dictionaryType === 'all') return this.$store.state.dictionaryModule.allDictionaries
        return this.$store.state.dictionaryModule.groupedDictionaries[this.dictionaryType]
      },
      langOptions() {
        return this.$t('dictLangs')
      }
    },
    methods: {
      checkLocale() {
        let containsLocale = this.languages.some((lang) => {
          return lang.code === this.$i18n.locale
        })
        if (!containsLocale) {
          this.$i18n.locale = 'en'
        }
      }
    }
  }
</script>

<style scoped lang="scss">

  #select-dict-type, #select-language {
    width: 150px;
  }

  #dictionaries-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
  }

  .dictionary-item {
    width: 20%;
    margin: 10px;
    flex-grow: 1;

    &.single {
      flex-grow: 0;
      margin:  0 auto;
      width: 50%;
    }

    @media only screen and (max-width:576px) {
      width: 100%;
      &.single {
        width: 80%;
      }
    }
    @media only screen and (min-width:576px) and (max-width: 768px) {
      width: 40%;
      &.single {
        width: 80%;
      }
    }
  }
</style>
