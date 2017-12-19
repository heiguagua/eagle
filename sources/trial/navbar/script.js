import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      menu: {
        isCollapse: false
      },
    }
  },
  computed: {
    ...mapState("Trial", [
      "trial",
      "options"
    ]),
  },
  methods: {
    collapse() {
      this.menu.isCollapse = !this.menu.isCollapse;
    }
  }
}
