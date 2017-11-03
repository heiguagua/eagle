import { mapState, mapActions, mapMutations } from 'vuex';
import Http from '../../../common/scripts/http';

export default {
  data() {
    return {

    }
  },
  methods: {
    printState() {
      const vm = this;
      console.log(this.state);
    },
    ...mapMutations({
      create: "TrialArticleToolbar/create",
      back: "TrialArticleToolbar/back",
    })
  },
  mounted() {
    this.back();
  }
};
