import Http from "../../../../common/scripts/http";
import { message, storage } from "../../../../common/scripts/helper";
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      case: {},
      trial: {},
      commonStyle: {
        lineHeight: "30pt",
        margin: "0 0.917cm",
        fontFamily: "仿宋",
        fontSize: "16pt",
        textIndent: "30pt",
        textAlign: "justify",
        textJustify: "inter-ideograph"
      },
      center :{
        textAlign: "center",
      },
      right: {
        textAlign: "right",
      },
      pMargin: {
        margin: "0"
      }
    };
  },
  computed: {
    isChiefOfficer() {
      return (this.trial.infomation.officer[0].duty === "审判长") ? true : false;
    },
    
  },
  created() {
    this.case = storage.get("case");
    this.trial = storage.get("trial");
  },
  methods: {
    save() {}
  }
};
