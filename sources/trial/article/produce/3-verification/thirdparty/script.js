import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import { message, notify } from "../../../../../common/scripts/helper";
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
    thirdpartyHandler(target, operation, params) {
      const vm = this;
      switch (target) {
        case "thirdparty":
          {
            // 添加
            if (operation === "add") {
              let thirdparty = Trial().verification.participator.thirdparties[0];
              thirdparty.subjects[0]["ordinal"] = Util.addNum('subjects', 'thirdparties', this.trial).length + 1;
              this.trial.verification.participator.thirdparties.push(thirdparty);
              message(vm, "success", "温馨提示：第三人添加成功！");
            }
            // 删除
            else if (operation === "remove") {
              let accuserIndex = params.accuserIndex;
              if (accuserIndex !== 0) {
                let thirdparties = vm.trial.verification.participator.thirdparties;
                thirdparties.splice(accuserIndex, 1);
                Util.updateNum('subjects', 'thirdparties', this.trial);
                message(vm, "warning", "温馨提示：第三人删除成功！");
              } else {
                message(vm, "error", "温馨提示：不能删除唯一的第三人！");
              }
            }
          }
          break;
        case "subject":
          {
            // 添加
            if (operation === "add") {
              let accuserIndex = params.accuserIndex;
              let originSubject = Trial().verification.participator.thirdparties[0].subjects[0];
              originSubject["ordinal"] = Util.addNum('subjects', 'thirdparties', this.trial).length + 1;
              let targetSubject = this.trial.verification.participator.thirdparties[accuserIndex].subjects.push(originSubject);
              message(vm, "success", "温馨提示：第三人诉讼主体添加成功！");
            }
            // 删除
            else if (operation === "remove") {
              let accuserIndex = params.accuserIndex;
              let subjectIndex = params.subjectIndex;
              if (subjectIndex !== 0) {
                this.trial.verification.participator.thirdparties[accuserIndex].subjects.splice(subjectIndex, 1);
                Util.updateNum('subjects', 'thirdparties', this.trial);
                message(vm, "warning", "温馨提示：第三人删除成功！");
              } else {
                message(vm, "error", "温馨提示：不能删除唯一的第三人！");
              }
            }
          }
          break;
        case "responsible":
          {
            // 添加
            if (operation === "add") {
              // let accuserIndex = params.accuserIndex;
              // let originSubject = Trial().verification.participator.thirdparties[0].responsibles[0];
              // let targetSubject = this.trial.verification.participator.thirdparties[accuserIndex].responsibles.push(originSubject);
              // message(vm, "success", "温馨提示：第三人法定代表人/负责人/法定代理人/指定代理人添加成功！");
            }
            // 删除
            else if (operation === "remove") {
              let accuserIndex = params.accuserIndex;
              let responsibleIndex = params.responsibleIndex;
              this.trial.verification.participator.thirdparties[accuserIndex].responsibles.splice(responsibleIndex, 1);
              message(vm, "warning", "温馨提示：第三人法定代表人/负责人/法定代理人/指定代理人删除成功！");
            }
          }
          break;
        case "agent":
          {
            // 添加
            if (operation === "add") {
              let accuserIndex = params.accuserIndex;
              let originAgent = Trial().verification.participator.thirdparties[0].agents[0];
              let targetAgents = this.trial.verification.participator.thirdparties[accuserIndex].agents;
              if (targetAgents.length < 2) {
                targetAgents.push(originAgent);
                message(vm, "success", "温馨提示：第三人委托诉讼代理人添加成功！");
              } else {
                message(vm, "error", "温馨提示：不能添加更多的第三人委托诉讼代理人！");
              }
            }
            // 删除
            else if (operation === "remove") {
              let accuserIndex = params.accuserIndex;
              let agentIndex = params.agentIndex;
              if (agentIndex !== 0) {
                this.trial.verification.participator.thirdparties[accuserIndex].agents.splice(agentIndex, 1);
                message(vm, "warning", "温馨提示：第三人委托诉讼代理人删除成功！");
              } else {
                message(vm, "error", "温馨提示：不能删除唯一的第三人委托诉讼代理人！");
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
};
