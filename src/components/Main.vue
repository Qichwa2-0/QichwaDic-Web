<template>
  <div class="container-fluid body-fixed-footer">
    <div class="row mt-2">
      <div class="col-12">
        <select id="select-language"
                class="custom-select language-selector float-right"
                v-model="$i18n.locale"
                @change="changeLocale">
          <option :key="index" v-for="(language, index) in languages" :value="language.code">
            {{ language.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="row" :class="[this.hasResults ? 'mt-1' : 'mt-2']">
      <div class="col-12">

        <section id="logo-header"
                 class="col-12 col-md-10 mx-auto text-center"
                 :class="[this.hasResults ? 'mt-1' : 'mt-2']">
            <router-link to="/">
              <img class="img-responsive mx-auto"
                   :class="[this.hasResults ? 'logo-small' : 'logo']"
                   src="/img/qichwa20-logo.png"
                   alt="Qichwa 2.0">
            </router-link>
            <p class="text-center" :class="[this.hasResults ? 'h4 ' : 'h2 mt-3']">
              <span class="text-info">{{ $t("main.title") }}</span>
            </p>
        </section>
      </div>
    </div>
    <div class="row">
      <router-link to="/dictionaries"
                   tag="button"
                   class="btn btn-secondary mx-auto mt-3 p-2">
        {{ $t("main.seeDictionaries") }}
      </router-link>
    </div>
    <div class="row">
      <section id="search"
               class="col-10 col-md-6 mx-auto"
               :class="[this.hasResults ? 'search-section-small-margin' : 'search-section']">
        <Search/>
      </section>
    </div>
    <div class="row">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Search from './search/Search'
import 'vue-awesome/icons/book'

export default {
  name: 'SearchBlock',
  components: { Search },
  data: function () {
    return {
      languages: [
        { code: 'es', name: 'Español' },
        { code: 'qus', name: 'Urin qichwa' },
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'Français' },
        { code: 'de', name: 'Deutsch', selected: false },
        { code: 'it', name: 'Italiano' },
        { code: 'cs', name: 'Čeština' }
      ],
      fromQuechua: false,
      showResults: false,
      showDictionaries: false,
      totalResults: 0
    }
  },
  created () {
    let savedLang = localStorage.getItem('qichwadic.lang')
    if (savedLang) {
      this.$i18n.locale = savedLang
    }
    this.emptyResults()
  },
  methods: {
    changeLocale (value) {
      let savedLang = localStorage.getItem('qichwadic.lang')
      if (savedLang && savedLang !== value) {
        localStorage.setItem('qichwadic.lang', value)
      }
    },
    emptyResults() {
      this.$store.commit('searchModule/setResults', [])
    }
  },
  computed: {
    hasResults () {
      return this.$store.getters["searchModule/hasResults"]
    }
  }, beforeRouteUpdate (to, from, next) {
    this.emptyResults()
    next()
  }
}
</script>
<style lang="scss" scoped>

.search-section{
  margin-top: 4rem;
}

.search-section-small-margin{
  margin-top: 1rem;
}

#select-language{
  width: 150px;
}

</style>
