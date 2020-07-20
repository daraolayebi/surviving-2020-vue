import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import About from '@/views/About'
import HomeNew from '@/views/HomeNew'
import Form from '@/views/Form'
import Success from '@/views/Success'
import Responses from '@/views/Responses'
import VueUA from 'vue-ua'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            name: 'page-not-found',
            redirect: '/'
        },
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: { transition: 'overlay-down-full' },
        },
        {
            path: '/about',
            name: 'About',
            component: About,
            meta: { transition: 'fade-in' },
        },
        {
            path: '/submit-story',
            name: 'Form',
            component: Form,
            meta: { transition: 'overlay-up-full' },
        },
        {
            path: '/stories',
            name: 'Responses',
            component: Responses,
            meta: { transition: 'overlay-right-full' },
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})

// Vue.use(VueUA, {
//     appName: 'Surviving 2020',
//     appVersion: '1.1',
//     trackingId: 'UA-168893926-1',
//     vueRouter: router,

//     // Global Dimensions and Metrics can optionally be specified.
//     globalDimensions: [
//         { dimension: 1, value: 'FirstDimension' },
//         { dimension: 2, value: 'SecondDimension' }
//         // Because websites are only 2D, obviously. WebGL? What's that?
//     ],
//     globalMetrics: [
//         { metric: 1, value: 'MyMetricValue' },
//         { metric: 2, value: 'AnotherMetricValue' }
//     ]
// })

export default router
