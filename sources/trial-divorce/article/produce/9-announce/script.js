import { mapMutations, mapActions, mapState, mapGetters } from "vuex";

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState("Trial", [
      "trial",
      "options",
      "template"
    ]),
  },
  methods: {
    handleCommand(command) {
      this.trial.announce.extemporeStatus = false;
      this.trial.announce.periodicalStatus = false;
      this.trial.announce.electiveStatus = false;
      switch (command){
        case "a":
        this.trial.announce.extemporeStatus = true;
        break;
        case "b":
          this.trial.announce.periodicalStatus = true;
          break;
        case "c":
          this.trial.announce.electiveStatus = true;
          break;
      }
    }
  },
};
