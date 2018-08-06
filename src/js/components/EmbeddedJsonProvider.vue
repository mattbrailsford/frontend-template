<script>
export default {
  name: 'EmbeddedJsonProvider',
  props: ['src'],
  computed: {
    json() {
      const self = this;
      if (!self.src) return null;
      if (typeof self.src === 'object') {
      	if (self.src.constructor === Array) {
        	return self.src.reduce((map, id) => {
            map[id] = self.getJson(id);
            return map;
          }, {});
        } else {
      		return Object.keys(self.src).reduce((map, key) => {
          	map[self.src[key]] = self.getJson(key);
            return map;
          }, {});
        }
      } else {
      	let map = {};
        map[self.src] = self.getJson(self.src);
      	return map;	
      }
    }
  },
  created() {
    const self = this;
    self.getJson = function(id) {
      const scriptEl = document.getElementById(id);
      if (!scriptEl) return;
      return JSON.parse(scriptEl.textContent);
    }
  },
  render(h) {
    return this.$scopedSlots.default
      ? this.$scopedSlots.default(this.json)
      : null
  }
}
</script>
