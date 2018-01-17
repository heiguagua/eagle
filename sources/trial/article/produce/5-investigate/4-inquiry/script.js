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
    handleChange(factor) {
      const factorJSON = JSON.parse(factor[1]);
      const start = factorJSON.start;
      const end = factorJSON.end;
      let index = factorJSON.index;
      let flag = 0;
      //去重
      this.trial.investigate.inquiry.elementquerys.forEach(item => {
        if (start && item.start == start && start!=='其他') {
          flag = 1;
          message(this, 'warning', "不能重复选择");
          return;
        }
      })
      if (!flag) {
        //当选择9部分 其他时，需要对审问题排序其1、其2、填写内容；
        //且审的回答内容需要对应到文书中，需要对其排序，index 为上一个不为的数
        const numJSON = JSON.parse(factor[0]);
        let order = 1; //其1、start排序
        if (numJSON == 9) {
          index =1;
          this.trial.investigate.inquiry.elementquerys.forEach(item => {
            if (item.ask_info_start.indexOf("其") == 0) {
              order = parseInt(item.ask_info_start.substring(1, 2)) + 1;
              // console.log(order)
            }
            if (item.verdict_index != 0) {
              index = item.verdict_index;
            } 
          });
        }
        if (end == '') {
          this.trial.investigate.inquiry.elementquerys.push({
            "ask_info_start": start, //审问题
            "summary_info_end": "审：", //审结论
            "verdict_index": index, //审结论总的排序
            "start": start, //原始的问题
            "end": end //原始的审部分
          })
        } else if (numJSON == 9 && end == "审：") {
          // console.log("排序：" + index)
          this.trial.investigate.inquiry.elementquerys.push({
            "ask_info_start": "其" + order + "、", //审问题
            "summary_info_end": end, //审结论
            "verdict_index": index, //审结论总的排序
            "start": start, //原始的问题
            "end": end //原始的审部分
          })
        } else {
          this.trial.investigate.inquiry.elementquerys.push({
            "ask_info_start": start, //审问题
            "summary_info_end": end, //审结论
            "verdict_index": index, //审结论总的排序
            "start": start, //原始的问题
            "end": end //原始的审部分
          })
        }
        let database = new DataBase(this.trial.verification.participator, true);
        this.trial.verification.participator = database.participator;
      }

    },
    //删除当前要素问题
    remove: function(index) {
      let database = new DataBase(this.trial.verification.participator, false, index);
      this.trial.verification.participator = database.participator;
      this.trial.investigate.inquiry.elementquerys.splice(index, 1);
    }
  },
  created() {
    const vm = this;
    const lawsuit = storage.get("case");
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
export const elementquerysOrder = (array) => {
  let arr = [],
    proof_affirm = ""; //审议归纳已排序
  if (array.length) {
    array.forEach((item) => {
      if (item.verdict_index != 0) {
        arr.push(item)
      }
    })
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (~~arr[i].verdict_index > ~~arr[j].verdict_index) { //~~ 这个符号是取number类型类似parentInt()
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }
    }
    for (let k = 0; k < arr.length; k++) {
      // console.log(arr[k].summary_info_end.substring(2))
      proof_affirm += arr[k].summary_info_end.substring(2)
    }

  }
  return proof_affirm;

};
