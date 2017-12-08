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
    getArgumentArray(debateArrayLen) {
      let array = [{ "detail": "" }];
      for (let i = 0; i <= debateArrayLen; i++) {
        array.push({ "detail": "" })
      }
      return array
    },
    accuserEvent(operation, params) {
      const vm = this;
      /* 添加操作 */
      if (operation === "add") {
        let thirdparty = Trial().verification.participator.thirdparties[0];
        thirdparty.subjects[0]["ordinal"] = Util.addNum('subjects', 'thirdparties', this.trial).length + 1;
        // 法庭询问,添加了几个问题
        let len = this.trial.investigate.inquiry.elementquerys.length || 0;
        if (len) {
          for (let j = 0; j < thirdparty.subjects.length; j++) {
            thirdparty.subjects[j].inquiry = this.getArray(len);
          }
          for (let j = 0; j < thirdparty.responsibles.length; j++) {
            thirdparty.responsibles[j].inquiry = this.getArray(len);
          }
          for (let j = 0; j < thirdparty.subjects.length; j++) {
            thirdparty.agents[j].inquiry = this.getArray(len);
          }
        }
        // 法庭辩论，添加几轮辩论
        let debateArrayLen = this.trial.argument.other.debateArray.length || 0;
        if (debateArrayLen) {
          for (let j = 0; j < thirdparty.subjects.length; j++) {
            thirdparty.subjects[j].argument = this.getArgumentArray(debateArrayLen);
          }
          for (let j = 0; j < thirdparty.responsibles.length; j++) {
            thirdparty.responsibles[j].argument = this.getArgumentArray(debateArrayLen);
          }
          for (let j = 0; j < thirdparty.subjects.length; j++) {
            thirdparty.agents[j].argument = this.getArgumentArray(debateArrayLen);
          }
        }
        this.trial.verification.participator.thirdparties.push(thirdparty);
        message(vm, "success", "温馨提示：第三人添加成功！");
      }
      /* 删除操作 */
      else if (operation === "remove") {
        const accuserIndex = params.accuserIndex;
        const thirdparties = this.trial.verification.participator.thirdparties;
        if (thirdparties.length > 1) {
          thirdparties.splice(accuserIndex, 1);
          Util.updateNum('subjects', 'thirdparties', this.trial);
          message(vm, "warning", "温馨提示：第三人删除成功！");
        } else {
          message(vm, "error", "温馨提示：不能删除唯一的第三人！");
        }
      }
    },
    subjectEvent(operation, params) {
      const vm = this;
      /* 添加操作 */
      if (operation === "add") {
        let accuserIndex = params.accuserIndex;
        let originSubject = Trial().verification.participator.thirdparties[0].subjects[0];
        originSubject["ordinal"] = Util.addNum('subjects', 'thirdparties', this.trial).length + 1;
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
        let targetSubject = this.trial.verification.participator.thirdparties[accuserIndex].subjects.push(originSubject);
        message(vm, "success", "温馨提示：第三人诉讼主体添加成功！");
      }
      /* 删除操作 */
      else if (operation === "remove") {
        const subjectIndex = params.subjectIndex;
        const accuserIndex = params.accuserIndex;
        const subjects = this.trial.verification.participator.thirdparties[accuserIndex].subjects;
        if (subjects != 0) {
          subjects.splice(subjectIndex, 1);
          Util.updateNum('subjects', 'thirdparties', this.trial);
          message(vm, "warning", "温馨提示：第三人删除成功！");
        } else {
          message(vm, "error", "温馨提示：不能删除唯一的第三人！");
        }
      }
    },
    responsibleEvent(operation, params) {
      const vm = this;
      /* 添加操作 */
      if (operation === "add") {}
      /* 删除操作 */
      else if (operation === "remove") {
        let accuserIndex = params.accuserIndex;
        let responsibleIndex = params.responsibleIndex;
        this.trial.verification.participator.thirdparties[accuserIndex].responsibles.splice(responsibleIndex, 1);
        message(vm, "warning", "温馨提示：第三人法定代表人/负责人/法定代理人/指定代理人删除成功！");
      }
    },
    agentEvent(operation, params) {
      const vm = this;
      /* 添加操作 */
      if (operation === "add") {
        let accuserIndex = params.accuserIndex;
        let originAgent = Trial().verification.participator.thirdparties[0].agents[0];
        let targetAgents = this.trial.verification.participator.thirdparties[accuserIndex].agents;
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
          message(vm, "success", "温馨提示：第三人委托诉讼代理人添加成功！");
        } else {
          message(vm, "error", "温馨提示：不能添加更多的第三人委托诉讼代理人！");
        }
      }
      /* 删除操作 */
      else if (operation === "remove") {
        const agentIndex = params.agentIndex;
        const accuserIndex = params.accuserIndex;
        const agents = this.trial.verification.participator.thirdparties[accuserIndex].agents;
        if (agents.length != 0) {
          agents.splice(agentIndex, 1);
          message(vm, "warning", "温馨提示：第三人委托诉讼代理人删除成功！");
        } else {
          message(vm, "error", "温馨提示：不能删除唯一的第三人委托诉讼代理人！");
        }
      }
    },
  },
  created() {
    const params = storage.get("case");
    this.trial.verification.participator.thirdparties[0].subjects[0].name = params.thirdparty;
    this.trial.verification.participator.thirdparties[0].subjects[0].info = params.accuser_baseinfo;
  }
};
