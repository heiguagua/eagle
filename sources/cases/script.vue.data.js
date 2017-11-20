export default {
  cases: [],
  pagination: {
    current: 1,
    size: 10,
    total: 0,
  },
  search: {
    name: "",
    status: "",
    reason: "",
    code: "",
    options: [{
      key: 1,
      value: "已结案",
    }, {
      key: 0,
      value: "未结案",
    }],
  },
  dialog: {
    show: false,
    case: {
      accuser: "",
      accused: "",
      code: "",
      reason: "",
      process: "",
      date: "",
    },
    options: [{
      key: 30,
      value: "小额诉讼程序",
    }, {
      key: 90,
      value: "简易程序",
    }, {
      key: 180,
      value: "普通程序",
    }],
    dataPickder: {
      shortcuts: [{
        text: "今天",
        onClick(picker) {
          picker.$emit("pick", new Date());
        }
      }, {
        text: "昨天",
        onClick(picker) {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24);
          picker.$emit("pick", date);
        }
      }]
    },
    validator: {
      accuser: [{
        required: true,
        message: "请输入原告信息",
        trigger: "change"
      }],
      accused: [{
        required: true,
        message: "请输入被告信息",
        trigger: "change"
      }],
      code: [{
        required: true,
        message: "请输入案号信息",
        trigger: "change"
      }],
      reason: [{
        required: true,
        message: "请输入案由信息",
        trigger: "change"
      }],
      process: [{
        required: true,
        message: "请选择适用程序",
        trigger: "change"
      }],
      date: [{
        required: true,
        message: "请选择受理日期",
        trigger: "change"
      }]
    }
  }
};
