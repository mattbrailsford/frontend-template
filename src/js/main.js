import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

// Globally register all components as we won't know if / when a component
// will be used as it'll be decided by the CMS
// taken from https://vuejs.org/v2/guide/components-registration.html#Automatic-Global-Registration-of-Base-Components
const requireComponent = require.context('./components', true, /.vue$/);

// For each matching file name...
requireComponent.keys().forEach(fileName => {
  // Get the component config
  const componentConfig = requireComponent(fileName)
  // Get the PascalCase version of the component name
  const componentName = upperFirst(camelCase(fileName.replace(/\.\w+$/, '')))
  // Globally register the component
  Vue.component(componentName, componentConfig.default || componentConfig)
})

// Start the vue app
// The only job of this instance is to "reactify" the page
// and make our components work, but for the most part,
// it shouldn't really do anything
window.vm = new Vue({
  el: '#app'
})