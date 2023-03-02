import { createRouter, createWebHistory } from "vue-router";
// import { mapGetters } from "vuex";
// import store from '@/store/store'
import LoginPage from '@/views/LoginPage.vue';
import PushPage from '@/views/PushPage.vue';


const routes = [
    {
        path: '/',
        name: 'Home',
        component: LoginPage
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage,
        alias: '/'
    }, {
        path: '/push',
        name: 'Push',
        component: PushPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})


router.beforeEach(async (to, from, next) => {
    //const isLogged = await store.state.isLogged
    //alert(JSON.stringify(store))
    const isLogged = window.localStorage.getItem('isLogged');
    console.log(isLogged)
    if (!['Home', 'Login'].includes(to.name) && !isLogged) {
        alert('Для перехода не эту страницу вам необходимо авторизоваться.')
        next({
            name: 'Login'
        })
    }
    else next()
})

export default router 
