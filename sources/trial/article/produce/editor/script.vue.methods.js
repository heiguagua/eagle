import Trial from "./script.vue.data.trial";
import { message, notify } from "../../../../common/scripts/helper";
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";

export default {
  ...mapMutations("Trial", [
    "setTrial"
  ]),
  // 原告
  accuserHandler(target, operation, params) {
    const vm = this;
    switch (target) {
      case "accuser":
        {
          // 添加
          if (operation === "add") {
            let accuser = Trial().verification.participator.accusers[0];
            this.trial.verification.participator.accusers.push(accuser);
            message(vm, "success", "温馨提示：原告添加成功！");
          }
          // 删除
          else if (operation === "remove") {
            let accuserIndex = params.accuserIndex;
            if (accuserIndex !== 0) {
              let accusers = vm.trial.verification.participator.accusers;
              accusers.splice(accuserIndex, 1);
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
            let targetSubject = this.trial.verification.participator.accusers[accuserIndex].subjects.push(originSubject);
            message(vm, "success", "温馨提示：原告诉讼主体添加成功！");
          }
          // 删除
          else if (operation === "remove") {
            let accuserIndex = params.accuserIndex;
            let subjectIndex = params.subjectIndex;
            if (subjectIndex !== 0) {
              this.trial.verification.participator.accusers[accuserIndex].subjects.splice(subjectIndex, 1);
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
  /* 被告 */
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
  /* 增加第三人 */
  thirdpartyHandler(target, operation, params) {
    const vm = this;
    switch (target) {
      case "thirdparty":
        {
          // 添加
          if (operation === "add") {
            let thirdparty = Trial().verification.participator.thirdparties[0];
            this.trial.verification.participator.thirdparties.push(thirdparty);
            message(vm, "success", "温馨提示：第三人添加成功！");
          }
          // 删除
          else if (operation === "remove") {
            let accuserIndex = params.accuserIndex;
            if (accuserIndex !== 0) {
              let thirdparties = vm.trial.verification.participator.thirdparties;
              thirdparties.splice(accuserIndex, 1);
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
            let targetSubject = this.trial.verification.participator.thirdparties[accuserIndex].subjects.push(originSubject);
            message(vm, "success", "温馨提示：第三人诉讼主体添加成功！");
          }
          // 删除
          else if (operation === "remove") {
            let accuserIndex = params.accuserIndex;
            let subjectIndex = params.subjectIndex;
            if (subjectIndex !== 0) {
              this.trial.verification.participator.thirdparties[accuserIndex].subjects.splice(subjectIndex, 1);
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
};
