import Http from "../../../common/scripts/http";
import JudgeTemplate from "./template";
import { message, storage } from "../../../common/scripts/helper";
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";

export default {
  components: {
    JudgeTemplate
  },
  data() {
    return {

    };
  },
  methods: {
    ...mapActions("Trial", [
      "saveTrial"
    ]),
    save() {
      const vm = this;
      const code = storage.get("case").case_no; // 案号
      const json = JSON.stringify(storage.get("trial")); // 庭审笔录状态树
      const html = vm.$el.innerHTML.replace(/\sdata-v-\w*=""/g, "");
      this.saveTrial({
        case_no: code,
        json,
        html,
        vm
      });
    },
    toWord() {
      Http.fetch({
          method: "POST",
          url: Http.url.master + "/word/generate",
          withCredentials: true,
          responseType: "blob",
          data: {
            name: "demo",
            html: "<html>demo</html>",
          }
        })
        .then(result => {
          const data = result.data;
          console.log(data)
          // if (Http.protocol(data, 200)) {
          //   var blob = new Blob([data], { type: "application/vnd.ms-word" }),
          //     fileName = "下载.docx";
          //   downFile(blob, fileName);

          //   function downFile(blob, fileName) {
          //     if (window.navigator.msSaveOrOpenBlob) {
          //       navigator.msSaveBlob(blob, fileName);
          //     } else {
          //       var link = document.createElement("a");
          //       link.href = window.URL.createObjectURL(blob);
          //       link.download = fileName;
          //       link.click();
          //       window.URL.revokeObjectURL(link.href);
          //     }
          //   }
          //   return data
          // } else {
          //   message(vm, "warning", data.head.message);
          // }
        });
    }
  }
};
