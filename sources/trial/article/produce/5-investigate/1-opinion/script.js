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
    seeDetail(parentIndex,index,subject) {
      if(subject === "subject") {
        this.trial.verification.participator.accusers[parentIndex].subjects[index].opinion.detail = "详见民事诉讼状。";
      }else if(subject === "responsible") {
        this.trial.verification.participator.accusers[parentIndex].responsibles[index].opinion.detail = "详见民事诉讼状。";
      }else if(subject === "agents") {
        this.trial.verification.participator.accusers[parentIndex].agents[index].opinion.detail = "详见民事诉讼状。";
      }
    }
  },
};
