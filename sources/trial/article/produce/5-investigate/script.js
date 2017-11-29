import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import InvestigateOpinion from "./1-opinion";
import InvestigateUndisputed from "./2-undisputed";
import InvestigateDisputed from "./3-disputed";
import InvestigateInquiry from "./4-inquiry";
import InvestigateProof from "./5-proof";
import InvestigateFact from "./6-fact";

export default {
  components: {
    InvestigateOpinion,
    InvestigateUndisputed,
    InvestigateDisputed,
    InvestigateInquiry,
    InvestigateProof,
    InvestigateFact
  },
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

  },
};
