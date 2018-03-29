import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import { message, storage } from "../../../../../common/scripts/helper";
import Http from "../../../../../common/scripts/http";
class DataBase {
  constructor(participator, flag, index) {
    this.participator = participator;
    this.flag = flag; //表示是添加还是删除(false ==> 删除  true ==> 添加)
    this.index = index; //表示是添加还是删除(false ==> 删除  true ==> 添加)
    this.getData()
    this.updataItemData(this.index)
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
  updata(data, index) {
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
      item.inquiry.push({ "detail": "" })
    })
  }
  removeChildren(data, index) {
    data.forEach(item => {
      item.inquiry.splice(index, 1);
    })
  }
}
export default {
  data() {
    return {
      factors: [],
    }
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
    handleChange() {
      // let flag = 0;
      // if (!flag) {
      //   this.trial.investigate.inquiry.elementquerys.push({
      //     "ask_info_start": "", //审问题
      //     "summary_info_end": "审：", //审结论
      //   })
      //   let database = new DataBase(this.trial.verification.participator, true);
      //   this.trial.verification.participator = database.participator;
      // }
      this.trial.investigate.inquiry.all.push({
        question:"审：",
        answer:"证人"
      })

    },
    //删除当前要素问题
    remove: function(index) {
      let vm = this;
      this.trial.investigate.inquiry.all.splice(index, 1);
    }
  },
  created() {
    const vm = this;
  }
};

