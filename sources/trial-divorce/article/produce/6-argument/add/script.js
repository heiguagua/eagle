import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import { message, notify, storage } from "../../../../../common/scripts/helper";
class DataBase {
  constructor(participator, flag, index) {
    this.participator = participator;
    // flag === true ? (this.item = item - 1) : (this.item = item + 1)
    this.flag = flag; //表示是添加还是删除(false ==> 删除  true ==> 添加)
    this.index = index;
    this.getData()
    this.updataItemData()
  }
  getData() {
    this.accuseds = this.participator.accuseds
    this.accusers = this.participator.accusers
    this.thirdparties = this.participator.thirdparties
  }
  updataItemData(index) {
    this.updata(this.accuseds, index)
    this.updata(this.accusers, index)
    this.updata(this.thirdparties, index)
  }
  updata(data, key, index) {
    data.forEach((item) => {
      if (this.flag) {
        this.addChildren(item.subjects)
        this.addChildren(item.responsibles)
        this.addChildren(item.agents)
      } else {
        this.removeChildren(item.subjects, index)
        this.removeChildren(item.responsibles, index)
        this.removeChildren(item.agents, index)
      }
    })
  }
  addChildren(data) {
    data.forEach(item => {
      item.argument.push({ "detail": "" })
    })
  }
  removeChildren(data) {
    data.forEach(item => {
      if (this.item <= 0) {
        this.item = 1
      }
      // delete item.argument.detail[this.item]
      item.argument.splice(index, 1);
    })
  }
}
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState("Trial", [
      "trial",
      "options",
      "template"
    ]),
  },
  methods: {
    ...mapMutations("Trial", [
      "setAdjourn", // 休庭操作
    ]),
    //删除评论次数
    delDebate: function(index) {
      const vm = this;
      if (this.trial.argument.other.debateArray.length) {
        this.trial.argument.other.debateArray.splice(index, 1);
        this.trial.argument.other.debateTimes--;
        let database = new DataBase(this.trial.verification.participator, this.trial.argument.other.debateTimes, false)
        this.trial.verification.participator = database.participator
        message(vm, "success", "删除成功！");
      } else {
        message(vm, "info", "当前没有可删除的法庭辩论！");
      }
    },

  },
};
