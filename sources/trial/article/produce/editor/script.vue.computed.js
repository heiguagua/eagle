import { mapMutations, mapActions, mapState, mapGetters } from "vuex";

export default {
  isChiefOfficer() {
    return (this.trial.infomation.officer[0].duty === "审判长") ? true : false;
  },
  trial: {
    get() {
      // return this.$store.state.obj.message
    },
    set(value) {
      // this.$store.commit('updateMessage', value)
    }
  }
};
