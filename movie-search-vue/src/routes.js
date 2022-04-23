import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store'

Vue.use(VueRouter)

import Home from './components/Home.vue';
import Info from './components/Info.vue';

import DashboardPage from './components/dashboard/dashboard.vue';
import SignupPage from './components/auth/signup.vue';
import SigninPage from './components/auth/signin.vue';
import WelcomePage from './components/welcome/welcome.vue'
export const routes = [

    { path: '/', name: 'WelcomePage', component: WelcomePage, props: true },
    { path: '/movie/:id', name: 'infoPage', component: Info, props: true },
    { path: '/signup', component: SignupPage },
    { path: '/signin',name: "SignPage", component: SigninPage },
    {
        path: '/dashboard',name: "DashboardPage" , component: DashboardPage, beforeEnter(to, from, next) {
            if (store.state.idToken) {
                next()
            } else {
                next('/signin')
            }
        }
    }

]
export default new VueRouter({ mode: 'history', routes })