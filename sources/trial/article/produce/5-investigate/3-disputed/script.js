import { mapMutations, mapActions, mapState, mapGetters } from "vuex";

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState("Trial", [
      "trial",
      "options"
    ]),
  },
  methods: {
    remove() {
      this.trial.investigate.conclude.disputed.show = false;
    },
    restitute() {
      this.trial.investigate.conclude.disputed.show = true;
    }
  },
};
