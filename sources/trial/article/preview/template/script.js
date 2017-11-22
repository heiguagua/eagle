import Http from "../../../../common/scripts/http";
import { message, storage } from "../../../../common/scripts/helper";
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      case: {},
      trial: {},
    };
  },
  computed: {
  },
  created() {
    this.case = storage.get("case");
    this.trial = storage.get("trial");
  },
  methods: {
    save() {

    }
  }
};
