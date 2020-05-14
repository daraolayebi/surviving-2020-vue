import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import About from '@/views/About'
import Responses from '@/views/Responses'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        // {
        //     path: '/about',
        //     name: 'About',
        //     component: About
        // },
        {
            path: '/responses',
            name: 'Responses',
            component: Responses
        }
    ]
})
