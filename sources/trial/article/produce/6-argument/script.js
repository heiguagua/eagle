import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import ArgumentAccuser from "./accuser";
import ArgumentAccused from "./accused";
import ArgumentThirdparty from "./thirdparty";
import ArgumentAdd from "./add";


export default {
  components: {
    ArgumentAccuser,
    ArgumentAccused,
    ArgumentThirdparty,
    ArgumentAdd
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
