import Vue from "vue";
import VueRouter from "vue-router";
import ErrorPage from "./views/ErrorPage";
import Home from "./views/home";
// import Home from "./views/Home"

Vue.use(VueRouter); // vue 에서 vue router 를 사용하기 위해 알려줘야합니다.

const routes = [
  { path:'/', component: Home},
  { path:'*', component: ErrorPage}
]

const router = new VueRouter({
  routes
})

export default router;