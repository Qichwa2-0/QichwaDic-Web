<template>
  <div class="container-fluid body-fixed-footer">
    <div class="row mt-2">
      <div class="col-12 ">
        <div class="float-left">
          <router-link to="/">
            <a class="form-control"><icon name="arrow-left" scale="1.1"/></a>
          </router-link>
        </div>
        <div class="float-right">
          <select id="select-language"
                    class="custom-select language-selector"
                    v-model="$i18n.locale">
            <option :key="index" v-for="(language, index) in languages" :value="language.code">
              {{ language.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <router-link to="/">
          <img class="img-responsive center-block logo" src="/img/qichwa20-logo.png" alt="Qichwa 2.0">
        </router-link>
      </div>
    </div>
    <div class="row">
      <section class="col-10 mx-auto">
        <h1 class="text-center">{{ $t("main.availableDictionaries") }}</h1>
        <p class="text-center mt-3">
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
    <div class="row mt-2">
      <div class="col-6 col-md-4 mx-auto text-center">
        <Spinner :visible="spinner" :message="$t('result.pleaseWait')"/>
        <select id="select-dict-type"
                class="custom-select d-block mx-auto"
                v-model="dictionaryType">
          <option :key="index" v-for="(dictLangOption, index) in langOptions" :value="dictLangOption.code">
            {{ dictLangOption.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12 col-md-10 mx-auto">
        <div id="dictionaries-container">
          <div v-for="(dictionary) in currentDictionaries"
               class="card bg-white dictionary-item"
               :key="dictionary.id"
               :class="currentDictionaries.length === 1 ? 'single' : ''">
            <div class="card-header bg-primary text-light"> {{ dictionary.name }} </div>
            <div class="card-body">
              <p><strong>{{ $t("dictionarySection.author") }}</strong> {{ dictionary.author }}</p>
              <p><strong>{{ $t("dictionarySection.description") }}</strong> {{ dictionary.description }}</p>
              <p><strong>{{ $t("dictionarySection.totalEntries") }}</strong> {{ dictionary.totalEntries }}</p>
              <p><strong>{{ $t("dictionarySection.compilator") }} </strong> {{ dictionary.compilator }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from 'vue-awesome/components/Icon'
  import 'vue-awesome/icons/home'
  import 'vue-awesome/icons/arrow-left'
  import Spinner from "../common/Spinner";

  export default {
    name: 'DictionaryStats',
    components: { Spinner, 'icon': Icon },
    data: function () {
      return {
        dictionaries: {},
        languages: [
          { code: 'es', name: 'Español' },
          { code: 'qus', name: 'Urin qichwa' },
          { code: 'en', name: 'English' },
          { code: 'fr', name: 'Français' },
        ],
        dictionaryType: 'all',
        allDictionaries: [],
        spinner: false
      }
    },
    created () {
      this.spinner = true
      this.checkLocale()
      this.$store.dispatch('dictionaryModule/fetchDictionaries')
              .then(() => this.spinner = false)
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
