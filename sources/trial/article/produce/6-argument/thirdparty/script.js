import { mapMutations, mapActions, mapState, mapGetters } from "vuex";

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState("Trial", [
      "trial",
      "options"
    ]),
  },
  methods: {
    addTrial: function() {
      this.trial.argument.other.debateArray = [];
      this.trial.argument.other.debateTimes++;
      for (var i = 1, len = this.trial.argument.other.debateTimes; i < len; i++) {
        this.trial.argument.other.debateArray.push({
          count: i
        });
      }
      console.log(this.trial.argument.other.debateArray)
    },
    //删除评论次数
    delDebate: function(index) {
      this.trial.argument.other.debateArray.splice(index, 1);
      this.trial.argument.other.debateTimes--;
      // layer.msg("删除成功")
    }
  },
};
