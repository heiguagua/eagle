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
    ...mapMutations("Trial", [
      "setAdjourn", // 休庭操作
    ]),
    changeJudge() {
      const vm = this;
      if (vm.trial.preface.organize.status == "hide") {
        vm.trial.preface.organize.status = "show";
      } else {
        vm.trial.preface.organize.status = "hide";
      }
    },
  },
};
