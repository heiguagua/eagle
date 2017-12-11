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
      // vm.event.verify.verify_participant.getToCourt();//存储到庭人员 （诉讼地位名：姓名）
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
          Util.updateNum('subjects', 'accuseds', this.trial);
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
        if (subjects != 0) {
          subjects.splice(subjectIndex, 1);
          Util.updateNum('subjects', 'accuseds', this.trial);
          message(vm, "warning", "温馨提示：被告删除成功！");
          // 更新到庭未到庭人员状态
          Util.showSetting(this.trial); //获取到庭状态
          Util.getAbsentee(this.trial); //获取未到庭人员列表
        } else {
          message(vm, "error", "温馨提示：不能删除唯一的被告！");
        }
      }
    },
    responsibleEvent(operation, params) {
      const vm = this;
      /* 添加操作 */
      if (operation === "add") {}
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
    const params = storage.get("case");
    this.trial.verification.participator.accuseds[0].subjects[0].name = params.accused;
    this.trial.verification.participator.accuseds[0].subjects[0].info = params.accused_baseinfo;
  }
};
