import Trial from "./script.vue.data.trial";
import { message, notify } from "../../../../common/scripts/helper";

export default {
  // 原告事件处理
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
  /* 增加被告 */
  addAccused() {
    let vm = this;
    let accused = Trial().verification.participator.accuseds[0];
    this.trial.verification.participator.accuseds.push(accused);
    notify(vm, "success", "温馨提示：诉讼参予人-被告添加成功！", "成功");
  },
  /* 增加第三人 */
  addThirdparty() {
    let vm = this;
    let thirdparty = Trial().verification.participator.thirdparties[0];
    this.trial.verification.participator.thirdparties.push(thirdparty);
    notify(vm, "success", "温馨提示：诉讼参予人-第三人添加成功！", "成功");
  },
};
