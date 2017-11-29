import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import ArgumentAccuser from "./accuser";
import ArgumentAccused from "./accused";
import ArgumentSummary from "./summary";
import ArgumentThirdparty from "./thirdparty";


export default {
  components: {
    ArgumentAccuser,
    ArgumentAccused,
    ArgumentSummary,
    ArgumentThirdparty,
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
