import { mapMutations, mapActions, mapState, mapGetters } from "vuex";

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState("Trial", [
      "trial"
    ]),
    isChiefOfficer() {
      return (this.trial.infomation.officer[0].duty === "审判长") ? true : false;
    },
  },
  methods: {

  },
};
