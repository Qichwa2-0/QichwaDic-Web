# QichwaDic - Web

Web version of multidialectal dictionary tool for Quechua (macro)-language, built as a SPA.

Start searching at [QichwaDic web](https://www.dic.qichwa.net)

## About this project

This project aims to help Quechua speakers, students and people who need a tool to improve their Quechua 
vocabulary. This tool might help native speakers who want to recover forgotten words and meanings 
or who want to learn new words from other Quechua dialects.

This app was inspired by other tools like 
[SimiDic](https://play.google.com/store/apps/details?id=com.ketanolab.simidic&hl=en) 
and [Aulex](https://aulex.org/qu-es/).

Some features:

* Search criteria (starts with, ends with, exact, contains)
* User can get results even if the target word was not correctly spelled 
(for some common cases, e.g. ccello -> qillu).
* Retrieves results for different Quechua dialects by setting equivalent writings. 
For example, yachachi- / yaĉachi- / yachatsi or qillu/q'illu
 
## Built with

This project is built with [Vue.js](https://vuejs.org/) as a 
[SPA](https://en.wikipedia.org/wiki/Single-page_application).
[Vue-Router](https://router.vuejs.org/) is used for routing ,
[Vue-translation](https://kazupon.github.io/vue-i18n/) for i18n support and
[Vuex](https://vuex.vuejs.org/) for state management.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## License

[MPL-2.0](https://www.mozilla.org/en-US/MPL/2.0/)