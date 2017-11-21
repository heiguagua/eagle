import Http from "../../../../common/scripts/http";
import { message, storage } from "../../../../common/scripts/helper";

export default {
  data() {
    return {
      case: {},
      trial: {}
    };
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
