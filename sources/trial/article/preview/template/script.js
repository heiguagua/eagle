import Http from "../../../../common/scripts/http";
import { message, storage } from "../../../../common/scripts/helper";
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      case: {},
    };
  },
  computed: {
    ...mapState("Trial", [
      "trial"
    ]),
  },
  created() {
    this.case = storage.get("case");
  },
  methods: {
    save() {

    }
  }
};
