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
    toCourtChange: function(obj) {
      obj.isAppear == "到庭" ? (obj.showFlag = true) : (obj.showFlag = false);
      Util.showSetting(this.trial);
      Util.getAbsentee(this.trial); //存储未到庭人员 （诉讼地位名：姓名）
      // vm.event.verify.verify_participant.lagalAgentChange(obj);
      Util.getToCourt(this.trial); //存储到庭人员 （诉讼地位名：姓名）
    },
    nameFormat() {//失去焦点时更新未到庭人员名称以及姓名格式验证
      Util.getAbsentee(this.trial); //存储未到庭人员 （诉讼地位名：姓名）
    },
    accuserEvent(operation, params) {
      const vm = this;
      /* 添加操作 */
      if (operation === "add") {
        let accuser = Trial().verification.participator.accusers[0];
        accuser.subjects[0]["ordinal"] = Util.addNum('subjects', 'accusers', this.trial).length + 1;
        // 法庭询问,添加了几个问题
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
        }
        // 法庭辩论，添加几轮辩论
        let debateArrayLen = this.trial.argument.other.debateArray.length || 0;
        if (debateArrayLen) {
          for (let j = 0; j < accuser.subjects.length; j++) {
            accuser.subjects[j].argument = this.getArgumentArray(debateArrayLen);
          }
          for (let j = 0; j < accuser.responsibles.length; j++) {
            accuser.responsibles[j].argument = this.getArgumentArray(debateArrayLen);
          }
          for (let j = 0; j < accuser.subjects.length; j++) {
            accuser.agents[j].argument = this.getArgumentArray(debateArrayLen);
          }
        }
        this.trial.verification.participator.accusers.push(accuser);
        message(vm, "success", "温馨提示：原告添加成功！");
        // 更新到庭未到庭人员状态
        Util.showSetting(this.trial); //获取到庭状态
        Util.getAbsentee(this.trial); //获取未到庭人员列表
      }
      /* 删除操作 */
      else if (operation === "remove") {
        const accuserIndex = params.accuserIndex;
        const accusers = this.trial.verification.participator.accusers;
        if (accusers.length > 1) {
          accusers.splice(accuserIndex, 1);
          Util.updateNum('subjects', 'accusers', this.trial);
          message(vm, "warning", "温馨提示：原告删除成功！");
          // 更新到庭未到庭人员状态
          Util.showSetting(this.trial); //获取到庭状态
          Util.getAbsentee(this.trial); //获取未到庭人员列表
        } else {
          message(vm, "error", "温馨提示：不能删除唯一的原告！");
        }
      }
    },
    subjectEvent(operation, params) {
      const vm = this;
      /* 添加操作 */
      if (operation === "add") {
        let accuserIndex = params.accuserIndex;
        let originSubject = Trial().verification.participator.accusers[0].subjects[0];
        originSubject["ordinal"] = Util.addNum('subjects', 'accusers', this.trial).length + 1;
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
        let targetSubject = this.trial.verification.participator.accusers[accuserIndex].subjects.push(originSubject);
        message(vm, "success", "温馨提示：原告诉讼主体添加成功！");
        // 更新到庭未到庭人员状态
        Util.showSetting(this.trial); //获取到庭状态
        Util.getAbsentee(this.trial); //获取未到庭人员列表
      }
      /* 删除操作 */
      else if (operation === "remove") {
        const subjectIndex = params.subjectIndex;
        const accuserIndex = params.accuserIndex;
        const subjects = this.trial.verification.participator.accusers[accuserIndex].subjects;
        if (subjects.length > 1) {
          subjects.splice(subjectIndex, 1);
          Util.updateNum('subjects', 'accusers', this.trial);
          message(vm, "warning", "温馨提示：原告删除成功！");
          // 更新到庭未到庭人员状态
          Util.showSetting(this.trial); //获取到庭状态
          Util.getAbsentee(this.trial); //获取未到庭人员列表
        } else {
          message(vm, "error", "温馨提示：不能删除唯一的原告！");
        }
      }
    },
    responsibleEvent(operation, params,role) {
      const vm = this;
      /* 添加操作 */
      if (operation === "add" && (role !== "法定代表人" && role !== "负责人")) {
        let accuserIndex = params.accuserIndex;
        let originResponsible = Trial().verification.participator.accusers[0].responsibles[0];
        let targetResponsible = this.trial.verification.participator.accusers[accuserIndex].responsibles;
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
        let accuserIndex = params.accuserIndex;
        let responsibleIndex = params.responsibleIndex;
        this.trial.verification.participator.accusers[accuserIndex].responsibles.splice(responsibleIndex, 1);
        message(vm, "warning", "温馨提示：原告法定代表人/负责人/法定代理人/指定代理人删除成功！");
        // 更新到庭未到庭人员状态
        Util.showSetting(this.trial); //获取到庭状态
        Util.getAbsentee(this.trial); //获取未到庭人员列表
      }
    },
    agentEvent(operation, params) {
      const vm = this;
      /* 添加操作 */
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
          let debateArrayLen = this.trial.argument.other.debateArray.length || 0;
          if (debateArrayLen) {
            originAgent.argument = this.getArgumentArray(debateArrayLen);
            // console.log(originAgent.inquiry)
          }
          targetAgents.push(originAgent);
          message(vm, "success", "温馨提示：原告委托诉讼代理人添加成功！");
          // 更新到庭未到庭人员状态
          Util.showSetting(this.trial); //获取到庭状态
          Util.getAbsentee(this.trial); //获取未到庭人员列表
        } else {
          message(vm, "error", "温馨提示：不能添加更多的原告委托诉讼代理人！");
        }
      }
      /* 删除操作 */
      else if (operation === "remove") {
        const agentIndex = params.agentIndex;
        const accuserIndex = params.accuserIndex;
        const agents = this.trial.verification.participator.accusers[accuserIndex].agents;
        if (agents.length != 0) {
          agents.splice(agentIndex, 1);
          message(vm, "warning", "温馨提示：原告委托诉讼代理人删除成功！");
          // 更新到庭未到庭人员状态
          Util.showSetting(this.trial); //获取到庭状态
          Util.getAbsentee(this.trial); //获取未到庭人员列表
        } else {
          message(vm, "error", "温馨提示：不能删除唯一的原告委托诉讼代理人！");
        }
      }
    },
  },
  created() {
    const vm = this;
    const operation = vm.$route.query.operation;
    // 区分新建、修改的状态，从而挂载不同的store
    if (operation === "create") {
      const params = storage.get("case");
      this.trial.verification.participator.accusers[0].subjects[0].name = params.accuser;
      this.trial.verification.participator.accusers[0].subjects[0].info = params.accuser_baseinfo;
    }

  }
};
