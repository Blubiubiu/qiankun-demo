import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerMicroApps, addGlobalUncaughtErrorHandler, start } from 'qiankun';

Vue.config.productionTip = false
const getActiveRule = (hash) => (location) => location.hash.startsWith(hash);
registerMicroApps([
  {
      name: 'vue-app111',
      entry: 'http://localhost:7100',
      container: '#yourContainer',
      activeRule: getActiveRule('#/portal')
  },
],{
  beforeLoad: (app) => console.log('before load', app),
  beforeMount: (app) => console.log('before mount', app.name),
});

addGlobalUncaughtErrorHandler((event) => {
  // console.log(event);
  const { message } = event;
  if (message && message.includes('died in status LOADING_SOURCE_CODE')) {
    console.log('微应用加载失败，请检查应用是否可运行', event);
  }
});
setTimeout(() => {
  console.log('start qiankun')
  start()
}, 3000)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
