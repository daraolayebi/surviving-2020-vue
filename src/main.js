// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Animate from 'animate.css'
import Autoscroll from 'vue-autoscroll'
import VueAnalytics from 'vue-analytics'
import VuePageTransition from 'vue-page-transition'
import VueSocialSharing from 'vue-social-sharing'

Vue.use(VueSocialSharing);
Vue.use(VuePageTransition)
Vue.use(Autoscroll)
Vue.use(Animate)
Vue.use(VueAnalytics, {
    id: 'UA-168893926-1',
    router,
    checkDuplicatedScript: true,
    autoTracking: {
        screenview: true,
        pageviewOnLoad: false
    }
})

Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
