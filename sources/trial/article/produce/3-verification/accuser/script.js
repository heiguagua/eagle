import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import { message, notify, storage  } from "../../../../../common/scripts/helper";
import Trial from "../../script.vue.data.trial";
import Util from "../util.js";

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
    getArray(len) {
      let array = [];
      for (let i = 0; i < len; i++) {
        console.log(i)
        array.push({ "detail": "" })
      }
      return array
    },
    accuserHandler(target, operation, params) {
      const vm = this;
      switch (target) {
        case "accuser":
          {
            // 添加
            if (operation === "add") {
              let accuser = Trial().verification.participator.accusers[0];
              accuser.subjects[0]["ordinal"] = Util.addNum('subjects', 'accusers', this.trial).length + 1;
              // 法庭询问,添加了几个问题
              // console.log(this.trial.investigate.inquiry)
              let len = this.trial.investigate.inquiry.elementquerys.length || 0;
              if (len) {
                for (let j = 0; j < accuser.subjects.length; j++) {
                  accuser.subjects[j].inquiry = this.getArray(len);
                }
                for (let j = 0; j < accuser.responsibles.length; j++) {
                  accuser.responsibles[j].inquiry = this.getArray(len);
                }
                for (let j = 0; j < accuser.subjects.length; j++) {
                  accuser.agents[j].inquiry = this.getArray(len);
                }
                // console.log(accuser.subjects)
              }

              // 法庭辩论，添加几轮辩论
              let len_1 = this.trial.argument.other.debateArray.length || 0;
              if (len_1) {
                for (let j = 0; j < accuser.subjects.length; j++) {
                  accuser.subjects[j].argument = this.getArray(len_1);
                }
                for (let j = 0; j < accuser.responsibles.length; j++) {
                  accuser.responsibles[j].argument = this.getArray(len_1);
                }
                for (let j = 0; j < accuser.subjects.length; j++) {
                  accuser.agents[j].argument = this.getArray(len_1);
                }
              }

              this.trial.verification.participator.accusers.push(accuser);
              message(vm, "success", "温馨提示：原告添加成功！");
            }
            // 删除
            else if (operation === "remove") {
              let accuserIndex = params.accuserIndex;
              if (accuserIndex !== 0) {
                let accusers = vm.trial.verification.participator.accusers;
                accusers.splice(accuserIndex, 1);
                Util.updateNum('subjects', 'accusers', this.trial);
                message(vm, "warning", "温馨提示：原告删除成功！");
              } else {
                message(vm, "error", "温馨提示：不能删除唯一的原告！");
              }
            }
          }
          break;
        case "subject":
          {
            // 添加
            if (operation === "add") {
              let accuserIndex = params.accuserIndex;
              let originSubject = Trial().verification.participator.accusers[0].subjects[0];
              originSubject["ordinal"] = Util.addNum('subjects', 'accusers', this.trial).length + 1;
              // 法庭询问,添加了几个问题
              // console.log(this.trial.investigate.inquiry)
              let len = this.trial.investigate.inquiry.elementquerys.length || 0;
              if (len) {
                originSubject.inquiry = this.getArray(len);
                //  console.log( originSubject.inquiry)
              }
              // 法庭辩论
              let len_1 = this.trial.argument.other.debateArray.length || 0;
              if (len_1) {
                originSubject.argument = this.getArray(len_1);
                //  console.log( originSubject.inquiry)
              }
              let targetSubject = this.trial.verification.participator.accusers[accuserIndex].subjects.push(originSubject);
              message(vm, "success", "温馨提示：原告诉讼主体添加成功！");
            }
            // 删除
            else if (operation === "remove") {
              let accuserIndex = params.accuserIndex;
              let subjectIndex = params.subjectIndex;
              if (subjectIndex !== 0) {
                this.trial.verification.participator.accusers[accuserIndex].subjects.splice(subjectIndex, 1);
                Util.updateNum('subjects', 'accusers', this.trial);
                message(vm, "warning", "温馨提示：原告删除成功！");
              } else {
                message(vm, "error", "温馨提示：不能删除唯一的原告！");
              }
            }
          }
          break;
        case "responsible":
          {
            // 添加
            if (operation === "add") {
              // let accuserIndex = params.accuserIndex;
              // let originSubject = Trial().verification.participator.accusers[0].responsibles[0];
              // let targetSubject = this.trial.verification.participator.accusers[accuserIndex].responsibles.push(originSubject);
              // message(vm, "success", "温馨提示：原告法定代表人/负责人/法定代理人/指定代理人添加成功！");
            }
            // 删除
            else if (operation === "remove") {
              let accuserIndex = params.accuserIndex;
              let responsibleIndex = params.responsibleIndex;
              this.trial.verification.participator.accusers[accuserIndex].responsibles.splice(responsibleIndex, 1);
              message(vm, "warning", "温馨提示：原告法定代表人/负责人/法定代理人/指定代理人删除成功！");
            }
          }
          break;
        case "agent":
          {
            // 添加
            if (operation === "add") {
              let accuserIndex = params.accuserIndex;
              let originAgent = Trial().verification.participator.accusers[0].agents[0];
              let targetAgents = this.trial.verification.participator.accusers[accuserIndex].agents;
              if (targetAgents.length < 2) {
                // 法庭询问,添加了几个问题
                let len = this.trial.investigate.inquiry.elementquerys.length || 0;
                if (len) {
                  originAgent.inquiry = this.getArray(len);
                  // console.log(originAgent.inquiry)
                }
                // 法庭辩论
                let len_1 = this.trial.argument.other.debateArray.length || 0;
                if (len_1) {
                  originAgent.argument = this.getArray(len_1);
                  // console.log(originAgent.inquiry)
                }
                targetAgents.push(originAgent);
                message(vm, "success", "温馨提示：原告委托诉讼代理人添加成功！");
              } else {
                message(vm, "error", "温馨提示：不能添加更多的原告委托诉讼代理人！");
              }
            }
            // 删除
            else if (operation === "remove") {
              let accuserIndex = params.accuserIndex;
              let agentIndex = params.agentIndex;
              if (agentIndex !== 0) {
                this.trial.verification.participator.accusers[accuserIndex].agents.splice(agentIndex, 1);
                message(vm, "warning", "温馨提示：原告委托诉讼代理人删除成功！");
              } else {
                message(vm, "error", "温馨提示：不能删除唯一的原告委托诉讼代理人！");
              }
            }
          }
          break;
        default:
          {
            notify(vm, "error", "温馨提示：请传入正确的Handler操作参数！", "错误");
          }
      }
    },
  },
  created(){
    const params =storage.get("case");
    this.trial.verification.participator.accusers[0].subjects[0].name=params.accuser;
    this.trial.verification.participator.accusers[0].subjects[0].info=params.accuser_baseinfo;
  }
};