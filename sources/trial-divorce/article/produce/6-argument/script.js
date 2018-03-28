import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import ArgumentAccuser from "./1-accuser";
import ArgumentAccused from "./2-accused";
import ArgumentAdd from "./add";


export default {
  components: {
    ArgumentAccuser,
    ArgumentAccused,
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
