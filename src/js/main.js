import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

// Globally register all components
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
window.vm = new Vue({
  el: '#app'
})