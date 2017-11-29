import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import { message, storage } from "../../../../../common/scripts/helper";
import Http from "../../../../../common/scripts/http";

export default {
  data() {
    return {
      factors: [],
    }
  },
  computed: {
    ...mapState("Trial", [
      "trial",
      "options"
    ]),
  },
  methods: {
    handleChange(factor) {
      const factorJSON = JSON.parse(factor[1]);
      const start = factorJSON.start;
      const end = factorJSON.end;
      console.log(start);
    },
  },
  created() {
    const vm = this;
    const lawsuit = storage.get("case");
    console.log(lawsuit);
    Http.fetch({
        method: 'GET',
        url: Http.url.master + '/trial/elements',
        params: {
          case_brief: lawsuit.case_brief,
          write_type: lawsuit.writ_type,
          category: lawsuit.category,
        }
      })
      .then(result => {
        const data = result.data;
        if (Http.protocol(data, 200)) {
          vm.factors = data.body;
          return data
        } else {
          message(vm, 'warning', data.head.message);
        }
      });
  }
};
