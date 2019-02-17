import VueRouter from 'vue-router'
import SearchAction from './components/search/SearchAction'
import Main from './components/Main'
import DictionaryStats from './components/dictionaries/DictionaryStats'

const buildRouter = function(){
    return new VueRouter({
        routes: [
            {
                path: '',
                component: Main,
                children: [
                    {
                        path: '/search/',
                        component: SearchAction,
                        props: function (route) {
                            return route.query || {}
                        }
                    }
                ]
            },
            {
                path: '/dictionaries/',
                component: DictionaryStats
            },
            { path: '*', redirect: '/' }
        ],
        scrollBehavior () {
            return { x: 0, y: 0 }
        }
    })
}

export default buildRouter