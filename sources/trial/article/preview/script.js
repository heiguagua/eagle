import Http from "../../../common/scripts/http";
import JudgeTemplate from "./template";
import { message, storage } from "../../../common/scripts/helper";

export default {
  components: {
    JudgeTemplate
  },
  data() {
    return {

    };
  },
  methods: {
    save() {
      const vm = this;
      const code = storage.get("case").case_no; // 案号
      const json = JSON.stringify(storage.get("trial")); // 庭审笔录状态树
      const html = vm.$el.innerHTML.replace(/\sdata-v-\w*=""/g, "");
      Http.fetch({
          method: "POST",
          url: Http.url.master + "/trial",
          data: {
            case_no: code,
            json: json,
            html: html,
          }
        })
        .then(result => {
          const data = result.data;
          if (Http.protocol(data, 200)) {
            message(vm, "success", data.head.message);
          } else {
            message(vm, "warning", data.head.message);
          }
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
