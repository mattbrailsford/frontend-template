import Vue from 'vue'

// Globally register all components by default as we won't know if / when a component
// will be used as it'll be decided by the CMS. If you don't want it globally registerd
// then prefix the filename with a '_'
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
  el: '#app'
})