import '@babel/polyfill'
import Vue from 'vue';
import './plugins/vuetify'
import TodoApp from './components/ToDo/components/TodoApp.vue';
// import router from './router';

Vue.config.productionTip = false;

console.log(1);

new Vue({
  name: "App",
  // router,
  render: (h) => h(TodoApp),
}).$mount('#app');
