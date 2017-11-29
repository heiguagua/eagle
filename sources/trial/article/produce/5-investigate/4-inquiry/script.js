import { mapMutations, mapActions, mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      factor: [],
    }
  },
  computed: {
    ...mapState("Trial", [
      "trial",
      "options"
    ]),
  },
  methods: {},
};
