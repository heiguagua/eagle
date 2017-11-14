import Http from '../../../common/scripts/http';
import { message } from '../../../common/scripts/helper';
import Data from './script.vue.data';
import Methods from './script.vue.methods';
import Computed from './script.vue.computed';

export default {
  data() {
    return Data;
  },
  computed: Computed,
  methods: Methods,
  mounted() {
    // this.getTemplate();
  },
  directives: {
    editable: {
      // 指令的定义
      bind(el, binding, vnode, oldVnode) {
        const model = binding.value;
        el.addEventListener('input', () => {
          vnode.context.$data.trial.other = el.innerHTML;
        });
        el.innerHTML = binding.value || '';
      },
      inserted(el, binding, vnode, oldVnode) {
        el.setAttribute('contenteditable', true);
      },
      update(el, binding, vnode, oldVnode) {

      },
      componentUpdated(el, binding, vnode, oldVnode) {

      },
      unbind(el, binding, vnode, oldVnode) {
        el.removeEventListener('input', binding.handler)
      }
    }
  }
};
