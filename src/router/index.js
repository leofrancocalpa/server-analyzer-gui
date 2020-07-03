import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import home from "../components/Home.vue"

const Foo = { template: '<div>foo</div>' }

const routes = [
    { path: '/', component: home },
];

export default new VueRouter({
    base: '/',
    routes
})
