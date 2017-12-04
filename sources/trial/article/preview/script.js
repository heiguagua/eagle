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
      "getTrials"
    ]),
    save() {
      const vm = this;
      const code = storage.get("case").case_no; // 案号
      const json = JSON.stringify(this.$store.state.Trial.trial); // 庭审笔录状态树
      const html = vm.$el.innerHTML.replace(/\sdata-v-\w*=""/g, "");
      Http.fetch({
          method: "POST",
          url: Http.url.master + "/trial",
          data: {
            case_no: code,
            json,
            html,
          }
        })
        .then(result => {
          const data = result.data;
          if (Http.protocol(data, 200)) {
            vm.getTrials({ vm });
            message(vm, "info", data.head.message);
            vm.$router.push("/layout/trial/blank");
          } else {
            message(vm, "warning", data.head.message);
          }
        })
    },
    toWord() {
      const vm = this;
      const html = vm.$el.innerHTML.replace(/\sdata-v-\w*=""/g, "");
      Http.fetch({
          method: "POST",
          url: Http.url.master + "/export/word",
          responseType: "blob",
          data: {
            fileName: "demo",
            html,
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
