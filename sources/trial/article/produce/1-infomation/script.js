import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import { message, storage } from '../../../../common/scripts/helper';
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState("Trial", [
      "trial",
      "options"
    ]),
    // isChiefOfficer() {
    //   return (this.trial.infomation.officer[0].duty === "审判长") ? true : false;
    // },
    isChiefOfficerTwo() {
      const params = storage.get("case");
      return (params.hearing_procedure === "simple") ? false : true;
    },
  },
  created() {
    const operation = this.$route.query.operation;
    // 区分新建、修改的状态
    if (operation === "create" ||this.trial.infomation.date =="") {
      this.trial.infomation.date =new Date();
      this.trial.infomation.time.start ="09:30";
      this.trial.infomation.time.end="11:30";
    }
    const params = storage.get("case");
    this.trial.preface.organize.program = params.hearing_procedure;
    this.trial.infomation.code = params.case_no;
    this.trial.infomation.reason = params.case_brief;
    this.trial.infomation.location.name = params.court_name;
    if (params.hearing_procedure === "simple"||params.hearing_procedure === "small_claim") {
      this.trial.infomation.officer[0].duty = "审判员";
      this.trial.infomation.officer.splice(1,2);
    }
  },
  methods: {
    isPublic() {
      if (this.trial.infomation.isPublic === "不公开") {
        this.trial.infomation.audience = 0;
      }
    },
    setOficerFormat: function(index) {
      const vm = this;
      var regx = /^[\u4E00-\u9FA5A-Za-z\s\?:·\u4E00-\u9FA5\.]+$/;
      if (this.trial.infomation.officer[index].name.length === 2) {
        let value = this.trial.infomation.officer[index].name.replace(/\s+/g, '');
        let nameArr = [];
        nameArr[0] = value.substr(0, 1);
        value.substr(1, 2) ? nameArr[1] = value.substr(1, 2) : 0;
        this.trial.infomation.officer[index].name = nameArr.join('　');
      }
      if (!this.trial.infomation.officer[index].name) {
        // layer.msg('姓名不能为空')
      } else if (this.trial.infomation.officer[index].name.length >= 50) {
        message(vm, "error", '字符过长');
        vm.article.store.data.info.judge[name] = "";
      } else if (!regx.test(this.trial.infomation.officer[index].name)) {
        message(vm, "error", '姓名只能为汉字或英文');
        this.trial.infomation.officer[index].name = "";
      }
    },
    setClerkFormat: function() {
      const vm = this;
      var regx = /^[\u4E00-\u9FA5A-Za-z\s\?:·\u4E00-\u9FA5\.]+$/;
      if (this.trial.infomation.clerk.length === 2) {
        let value = this.trial.infomation.clerk.replace(/\s+/g, '');
        let nameArr = [];
        nameArr[0] = value.substr(0, 1);
        value.substr(1, 2) ? nameArr[1] = value.substr(1, 2) : 0;
        this.trial.infomation.clerk = nameArr.join('　');
      }
      if (!this.trial.infomation.clerk) {
        // layer.msg('姓名不能为空')
      } else if (this.trial.infomation.clerk.length >= 50) {
        message(vm, "error", '字符过长');
        this.trial.infomation.clerk = "";
      } else if (!regx.test(this.trial.infomation.clerk)) {
        message(vm, "error", '姓名只能为汉字或英文');
        this.trial.infomation.clerk = "";
      }
    }
  },
};