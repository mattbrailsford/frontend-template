import Vue from 'vue'

// Manually declare any async components
// Async components will be loaded dynamically when first requested
// which may help with performance. You should only really do this though
// for larger more complex components or ones that are only used on a
// single page as loading all components async would cause perf issues
// of their own.
Vue.component('MyAsyncComponent', () => import('./components/_MyAsyncComponent.vue'))

// Globally register all public components by default as we won't know if / when a component
// will be used as it'll be decided by the CMS. If you don't want it globally registerd
// then prefix the filename with a '_' to make it private
// taken from https://vuejs.org/v2/guide/components-registration.html#Automatic-Global-Registration-of-Base-Components
const requireComponent = require.context('./components', true, /(?:^|\/)(?!_)\w+\.vue$/);
// For each matching file name...
requireComponent.keys().forEach(fileName => {
  // Get the component config
  const componentConfig = requireComponent(fileName)
  // Get the default component from the config
  const component = componentConfig.default || componentConfig;
  // Globally register the component using the component name from the component config
  Vue.component(component.name, component)
})

// Start the vue app
// The only job of this instance is to "reactify" the page
// and make our components work, but for the most part,
// it shouldn't really do anything
window.vm = new Vue({
  el: '#page'
})