import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import PrefaceOrganize from "./1-organize";
import PrefaceRights from "./2-rights";
import PrefaceMatter from "./3-matter";
import PrefaceEvasion from "./4-evasion";
import PrefaceEvidence from "./5-evidence";

export default {
  data() {
    return {}
  },
  components: {
    PrefaceOrganize,
    PrefaceRights,
    PrefaceMatter,
    PrefaceEvasion,
    PrefaceEvidence,
  },
  computed: {
    ...mapState("Trial", [
      "trial",
      "options"
    ]),
  },
  methods: {},
};
