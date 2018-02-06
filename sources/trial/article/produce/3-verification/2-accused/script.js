import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import { message, notify, storage } from "../../../../../common/scripts/helper";
import Trial from "../../script.vue.data.trial";
import Util from "../util.js";

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
    getArray(len) {
      let array = [];
      for (let i = 0; i < len; i++) {
        array.push({ "detail": "" })
      }
      return array
    },
    getArgumentArray(debateArrayLen) {
      let array = [{ "detail": "" }];
      for (let i = 0; i <= debateArrayLen; i++) {
        array.push({ "detail": "" })
      }
      return array
    },
    lagalAgentChange: function(params, selectModel) {
      const vm = this;
      if(selectModel) {
        if(selectModel.role =="法定代表人"||selectModel.role =="负责人"){
        let accuseds = this.trial.verification.participator.accuseds;
            for (let i in accuseds) {
              let count = 0;
              if(accuseds[i].responsibles.length>1){
                let accusedIndex = params.accusedIndex;
                let responsibleIndex = params.responsibleIndex;
                message(vm, "warning", "温馨提示：只有一个法定代表人/负责人！");
                for(let j in accuseds[i].responsibles){
                   if(j!=responsibleIndex){
                    this.trial.verification.participator.accuseds[accusedIndex].responsibles.splice(j,1);
                   }
                }
              }
            }
      }
      switch (selectModel.role) {
        case "法定代表人":
          selectModel.shortName = "";
          selectModel.type = selectModel.parentType + selectModel.role;
          break;
        case "负责人":
          selectModel.shortName = "";
          selectModel.type = selectModel.parentType + selectModel.role;
          break;
        case "法定代理人":
          selectModel.shortName = "法代";
          selectModel.type = selectModel.parentType + selectModel.role;
          break;
        case "指定代理人":
          selectModel.shortName = "指代";
          selectModel.type = selectModel.parentType + selectModel.role;
      }
      }
      Util.getAbsentee(this.trial); //存储未到庭人员 （诉讼地位名：姓名）
    },
    toCourtChange(obj) {
      const vm = this;
      obj.isAppear == "到庭" ? (obj.showFlag = true) : (obj.showFlag = false);
      Util.showSetting(this.trial);
      Util.getAbsentee(this.trial); //存储未到庭人员 （诉讼地位名：姓名）
      vm.lagalAgentChange(obj); //法定代理人，指定代理人简称
      Util.getToCourt(this.trial); //存储到庭人员 （诉讼地位名：姓名）
    },
    nameFormat() {//失去焦点时更新未到庭人员名称以及姓名格式验证
      Util.getAbsentee(this.trial); //存储未到庭人员 （诉讼地位名：姓名）
    },
    accusedEvent(operation, params) {
      const vm = this;
      /* 添加操作 */
      if (operation === "add") {
        let accused = Trial().verification.participator.accuseds[0];
        accused.subjects[0]["ordinal"] = Util.addNum('subjects', 'accuseds', this.trial).length + 1;
        // 法庭询问,添加了几个问题
        let len = this.trial.investigate.inquiry.elementquerys.length || 0;
        if (len) {
          for (let j = 0; j < accused.subjects.length; j++) {
            accused.subjects[j].inquiry = this.getArray(len);
          }
          for (let j = 0; j < accused.responsibles.length; j++) {
            accused.responsibles[j].inquiry = this.getArray(len);
          }
          for (let j = 0; j < accused.subjects.length; j++) {
            accused.agents[j].inquiry = this.getArray(len);
          }
        }
        // 法庭辩论，添加几轮辩论
        let debateArrayLen = this.trial.argument.other.debateArray.length || 0;
        if (debateArrayLen) {
          for (let j = 0; j < accused.subjects.length; j++) {
            accused.subjects[j].argument = this.getArgumentArray(debateArrayLen);
          }
          for (let j = 0; j < accused.responsibles.length; j++) {
            accused.responsibles[j].argument = this.getArgumentArray(debateArrayLen);
          }
          for (let j = 0; j < accused.subjects.length; j++) {
            accused.agents[j].argument = this.getArgumentArray(debateArrayLen);
          }
        }
        this.trial.verification.participator.accuseds.push(accused);
        // 序号
        let accusedsLength = this.trial.verification.participator.accuseds.length;
        for(let i = 0; i < accusedsLength; i++) {
          this.trial.verification.participator.accuseds[i].serialNumbers = [];
          this.trial.verification.participator.accuseds[i].subjects.forEach((item, j, array) => {
            this.trial.verification.participator.accuseds[i].serialNumbers.push({
              num: item.ordinal
            })
          });
        }
        message(vm, "success", "温馨提示：被告添加成功！");
        // 更新到庭未到庭人员状态
        Util.showSetting(this.trial); //获取到庭状态
        Util.getAbsentee(this.trial); //获取未到庭人员列表
      }
      /* 删除操作 */
      else if (operation === "remove") {
        const accusedIndex = params.accusedIndex;
        const accuseds = this.trial.verification.participator.accuseds;
        if (accuseds.length > 1) {
          accuseds.splice(accusedIndex, 1);
          Util.updateNum(null, 'accuseds', this.trial);
          // 序号
          let accusedsLength = this.trial.verification.participator.accuseds.length;
          for(let i = 0; i < accusedsLength; i++) {
            this.trial.verification.participator.accuseds[i].serialNumbers = [];
            this.trial.verification.participator.accuseds[i].subjects.forEach((item, j, array) => {
              this.trial.verification.participator.accuseds[i].serialNumbers.push({
                num: item.ordinal
              })
            });
          }
          message(vm, "warning", "温馨提示：被告删除成功！");
          // 更新到庭未到庭人员状态
          Util.showSetting(this.trial); //获取到庭状态
          Util.getAbsentee(this.trial); //获取未到庭人员列表
        } else {
          message(vm, "error", "温馨提示：不能删除唯一的被告！");
        }
      }
    },
    subjectEvent(operation, params) {
      const vm = this;
      /* 添加操作 */
      if (operation === "add") {
        let accusedIndex = params.accusedIndex;
        let originSubject = Trial().verification.participator.accuseds[0].subjects[0];
        originSubject["ordinal"] = Util.addNum('subjects', 'accuseds', this.trial).length + 1;
        // 法庭询问,添加了几个问题
        let len = this.trial.investigate.inquiry.elementquerys.length || 0;
        if (len) {
          originSubject.inquiry = this.getArray(len);
        }
        // 法庭辩论
        let debateArrayLen = this.trial.argument.other.debateArray.length || 0;
        if (debateArrayLen) {
          originSubject.argument = this.getArgumentArray(debateArrayLen);
        }
        let targetSubject = this.trial.verification.participator.accuseds[accusedIndex].subjects.push(originSubject);
        //序号
        this.trial.verification.participator.accuseds[accusedIndex].serialNumbers = [];
        this.trial.verification.participator.accuseds[accusedIndex].subjects.forEach((item,i,array) => {
          this.trial.verification.participator.accuseds[accusedIndex].serialNumbers.push({
            num: item.ordinal
          })
        });
        message(vm, "success", "温馨提示：被告诉讼主体添加成功！");
        // 更新到庭未到庭人员状态
        Util.showSetting(this.trial); //获取到庭状态
        Util.getAbsentee(this.trial); //获取未到庭人员列表
      }
      /* 删除操作 */
      else if (operation === "remove") {
        const subjectIndex = params.subjectIndex;
        const accusedIndex = params.accusedIndex;
        const subjects = this.trial.verification.participator.accuseds[accusedIndex].subjects;
        if (subjects.length > 1) {
          subjects.splice(subjectIndex, 1);
          Util.updateNum(null, 'accuseds', this.trial);
          //序号
          this.trial.verification.participator.accuseds[accusedIndex].serialNumbers = [];
          this.trial.verification.participator.accuseds[accusedIndex].subjects.forEach((item,i,array) => {
            this.trial.verification.participator.accuseds[accusedIndex].serialNumbers.push({
              num: item.ordinal
            })
          });
          message(vm, "warning", "温馨提示：被告删除成功！");
          // 更新到庭未到庭人员状态
          Util.showSetting(this.trial); //获取到庭状态
          Util.getAbsentee(this.trial); //获取未到庭人员列表
        } else {
          message(vm, "error", "温馨提示：不能删除唯一的被告！");
        }
      }
    },
    responsibleEvent(operation, params,role) {
      const vm = this;
      /* 添加操作 */
      /* 添加操作 */
      if (operation === "add" && (role !== "法定代表人" && role !== "负责人")) {
        let accuserIndex = params.accusedIndex;
        let originResponsible = Trial().verification.participator.accuseds[0].responsibles[0];
        let targetResponsible = this.trial.verification.participator.accuseds[accuserIndex].responsibles;
        if(targetResponsible.length < 2) {
          // 法庭询问,添加了几个问题
          let len = this.trial.investigate.inquiry.elementquerys.length || 0;
          if (len) {
            originResponsible.inquiry = this.getArray(len);
            // console.log(originAgent.inquiry)
          }
          // 法庭辩论
          let debateArrayLen = this.trial.argument.other.debateArray.length || 0;
          if (debateArrayLen) {
            originResponsible.argument = this.getArgumentArray(debateArrayLen);
            // console.log(originAgent.inquiry)
          }
          targetResponsible.push(originResponsible);
          message(vm, "success", "温馨提示：添加成功！");
          // 更新到庭未到庭人员状态
          Util.showSetting(this.trial); //获取到庭状态
          Util.getAbsentee(this.trial); //获取未到庭人员列表
        } else {
          message(vm, "warning", "温馨提示：不能添加更多的法定代理人/指定代理人！");
        }
      } else if (operation === "add" && (role == "法定代表人" || role == "负责人")) {
          message(vm, "warning", "温馨提示：法定代表人/负责人不能添加！");
      }
      /* 删除操作 */
      else if (operation === "remove") {
        let accusedIndex = params.accusedIndex;
        let responsibleIndex = params.responsibleIndex;
        this.trial.verification.participator.accuseds[accusedIndex].responsibles.splice(responsibleIndex, 1);
        message(vm, "warning", "温馨提示：被告法定代表人/负责人/法定代理人/指定代理人删除成功！");
        // 更新到庭未到庭人员状态
        Util.showSetting(this.trial); //获取到庭状态
        Util.getAbsentee(this.trial); //获取未到庭人员列表
      }
    },
    agentEvent(operation, params) {
      const vm = this;
      /* 添加操作 */
      if (operation === "add") {
        let accusedIndex = params.accusedIndex;
        let originAgent = Trial().verification.participator.accuseds[0].agents[0];
        let targetAgents = this.trial.verification.participator.accuseds[accusedIndex].agents;
        if (targetAgents.length < 2) {
          // 法庭询问,添加了几个问题
          let len = this.trial.investigate.inquiry.elementquerys.length || 0;
          if (len) {
            originAgent.inquiry = this.getArray(len);
            // console.log(originAgent.inquiry)
          }
          // 法庭辩论
          let debateArrayLen = this.trial.argument.other.debateArray.length || 0;
          if (debateArrayLen) {
            originAgent.argument = this.getArgumentArray(debateArrayLen);
            // console.log(originAgent.inquiry)
          }
          targetAgents.push(originAgent);
          message(vm, "success", "温馨提示：被告委托诉讼代理人添加成功！");
          // 更新到庭未到庭人员状态
          Util.showSetting(this.trial); //获取到庭状态
          Util.getAbsentee(this.trial); //获取未到庭人员列表
        } else {
          message(vm, "error", "温馨提示：不能添加更多的被告委托诉讼代理人！");
        }
      }
      /* 删除操作 */
      else if (operation === "remove") {
        const agentIndex = params.agentIndex;
        const accusedIndex = params.accusedIndex;
        const agents = this.trial.verification.participator.accuseds[accusedIndex].agents;
        if (agents.length != 0) {
          agents.splice(agentIndex, 1);
          message(vm, "warning", "温馨提示：被告委托诉讼代理人删除成功！");
          // 更新到庭未到庭人员状态
          Util.showSetting(this.trial); //获取到庭状态
          Util.getAbsentee(this.trial); //获取未到庭人员列表
        } else {
          message(vm, "error", "温馨提示：不能删除唯一的被告委托诉讼代理人！");
        }
      }
    },
  },
  created() {
    const vm = this;
    const operation = vm.$route.query.operation;
    // 区分新建、修改的状态，从而挂载不同的store
    if (operation === "create") {
      const lawcase = storage.get("case");
      // 被告
      if(typeof lawcase.defendant === "string") {
        this.trial.verification.participator.accuseds[0].subjects[0].name = lawcase.defendant;
        this.trial.verification.participator.accuseds[0].subjects[0].info = lawcase.defendant_baseinfo;
      }
      else if(typeof lawcase.defendant==="object" && lawcase.length!==0) {
        const subjects = [];
        for(let index=0; index<lawcase.defendant.length; index++) {
          subjects.push(Trial().verification.participator.accuseds[0].subjects[0]);
          subjects[index].name = lawcase.defendant[index].name;
          subjects[index].info = lawcase.defendant[index].info;
        }
        this.trial.verification.participator.accuseds[0].subjects = subjects;
      }
    }
  }
};
