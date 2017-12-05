import Http from "../../../common/scripts/http";
import { message, storage } from "../../../common/scripts/helper";
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";

export default {
  data() {
    return {

    };
  },
  computed: {
    isProduction() {
      return process.env.NODE_ENV !== "production";
    }
  },
  methods: {

  }
};
