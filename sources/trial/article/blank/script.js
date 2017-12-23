import Http from "../../../common/scripts/http";
import { message, storage } from "../../../common/scripts/helper";
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";

export default {
  data() {
    return {

    };
  },
  computed: {
    ...mapState("Trial", [
      "trial",
      "options"
    ]),
    isProduction() {
      return process.env.NODE_ENV !== "production";
    }
  },
  mounted() {},
  methods: {
    ...mapMutations("Trial", [
      "setLoading"
    ]),
    create() {
      this.$router.push({ path: '/layout/trial/produce', query: { operation: 'create' } });
      this.setLoading(true);
    }
  }
};
