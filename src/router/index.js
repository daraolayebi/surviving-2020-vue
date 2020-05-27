import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Form from '@/views/Form'
import Responses from '@/views/Responses'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: { transition: 'overlay-down-full' },
            // meta: { transitionName: 'slide' }
        },
        {
            path: '/submit',
            name: 'Form',
            component: Form,
            meta: { transition: 'overlay-up-full' },
            // meta: { transitionName: 'slide' }
        },
        {
            path: '/responses',
            name: 'Responses',
            component: Responses,
            meta: { transition: 'overlay-right-full' },
        }
    ]
})
