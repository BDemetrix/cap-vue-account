import { createRouter, createWebHistory } from "vue-router";
// import { mapGetters } from "vuex";
import store from '@/store/store'
import LoginPage from '@/views/LoginPage.vue';
import PushPage from '@/views/PushPage.vue';
import MsgPage from '@/views/MsgPage.vue';


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
    },
    {
        path: '/push',
        name: 'Push',
        component: PushPage
    },
    {
        path: '/msg',
        name: 'Msg',
        component: MsgPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})



router.beforeEach((to, from, next) => {

    setTimeout(() => {
        const isLogged = store.getters.isLogged
        //alert(JSON.stringify({isLogged}))
        // const isLogged = window.localStorage.getItem('isLogged');
        console.log(isLogged)
        if (!['Home', 'Login', 'Msg'].includes(to.name) && !isLogged) {
            alert('Для перехода не эту страницу вам необходимо авторизоваться.')
            next({
                name: 'Login'
            })
        } else next()
    }, 0);
})

export default router 
