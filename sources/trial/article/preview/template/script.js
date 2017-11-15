import Http from "../../../../common/scripts/http";
import { storage } from "../../../../common/scripts/helper";

export default {
  data() {
    return {
      trial: {}
    };
  },
  created() {
    this.trial = storage.get("trial");
  }
};
