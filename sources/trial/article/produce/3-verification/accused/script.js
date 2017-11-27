import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import { message, notify } from "../../../../../common/scripts/helper";
import Trial from "../../script.vue.data.trial";

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
    accusedHandler(target, operation, params) {
      const vm = this;
      switch (target) {
        case "accused":
          {
            // 添加
            if (operation === "add") {
              let accused = Trial().verification.participator.accuseds[0];
              this.trial.verification.participator.accuseds.push(accused);
              message(vm, "success", "温馨提示：原告添加成功！");
            }
            // 删除
            else if (operation === "remove") {
              let accusedIndex = params.accusedIndex;
              if (accusedIndex !== 0) {
                let accuseds = vm.trial.verification.participator.accuseds;
                accuseds.splice(accusedIndex, 1);
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
              let accusedIndex = params.accusedIndex;
              let originSubject = Trial().verification.participator.accuseds[0].subjects[0];
              let targetSubject = this.trial.verification.participator.accuseds[accusedIndex].subjects.push(originSubject);
              message(vm, "success", "温馨提示：原告诉讼主体添加成功！");
            }
            // 删除
            else if (operation === "remove") {
              let accusedIndex = params.accusedIndex;
              let subjectIndex = params.subjectIndex;
              if (subjectIndex !== 0) {
                this.trial.verification.participator.accuseds[accusedIndex].subjects.splice(subjectIndex, 1);
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
              // let accusedIndex = params.accusedIndex;
              // let originSubject = Trial().verification.participator.accuseds[0].responsibles[0];
              // let targetSubject = this.trial.verification.participator.accuseds[accusedIndex].responsibles.push(originSubject);
              // message(vm, "success", "温馨提示：原告法定代表人/负责人/法定代理人/指定代理人添加成功！");
            }
            // 删除
            else if (operation === "remove") {
              let accusedIndex = params.accusedIndex;
              let responsibleIndex = params.responsibleIndex;
              this.trial.verification.participator.accuseds[accusedIndex].responsibles.splice(responsibleIndex, 1);
              message(vm, "warning", "温馨提示：原告法定代表人/负责人/法定代理人/指定代理人删除成功！");
            }
          }
          break;
        case "agent":
          {
            // 添加
            if (operation === "add") {
              let accusedIndex = params.accusedIndex;
              let originAgent = Trial().verification.participator.accuseds[0].agents[0];
              let targetAgents = this.trial.verification.participator.accuseds[accusedIndex].agents;
              if (targetAgents.length < 2) {
                targetAgents.push(originAgent);
                message(vm, "success", "温馨提示：原告委托诉讼代理人添加成功！");
              } else {
                message(vm, "error", "温馨提示：不能添加更多的原告委托诉讼代理人！");
              }
            }
            // 删除
            else if (operation === "remove") {
              let accusedIndex = params.accusedIndex;
              let agentIndex = params.agentIndex;
              if (agentIndex !== 0) {
                this.trial.verification.participator.accuseds[accusedIndex].agents.splice(agentIndex, 1);
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
};
