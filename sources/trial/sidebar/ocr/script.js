import Http from "../../../common/scripts/http";
import Encrypt from "../../../common/scripts/encrypt.js";
import { mapMutations, mapActions, mapState } from "vuex";
import { message, storage } from "../../../common/scripts/helper";
import UtilSidebar from "../script.util";

export default {
  data() {
    const params = storage.get('case');
    const token = Encrypt.token.get();
    return {
      fileList: [],
      images: [],
      headers: {
        "Authorization": "Wiserv " + token
      },
      uploadUrl: Http.url.master + "/legal_case/uploadCaseFiles", //上传材料地址
      uploadData: {
        case_no: params.case_no
      }, //上传材料参数
      dialogImageVisible: false, //识别图片的对话框是否显示
      ocrImageUrl: "", //待识别的图片
      ocrResult: [], //识别的图片内容
      ocrResultLoading: false
    }
  },
  computed: {
    ...mapState("Trial", [
      "trial",
      "options"
    ]),
  },
  mounted() {},
  methods: {
    ...mapActions("Trial", [
      "getTrials",
    ]),
    ...mapMutations("Trial", [
      "setTrial",
      "setOptions"
    ]),
    //过滤上传图片格式、大小
    beforeAvatarUpload(file) {
      let isJPG = false, //图片格式是否正确
        isLt4M = false, //图片大小是否正确
        isNoExist = true; //图片是否已存在
      //照片格式
      const type = "image/jpg,image/gif, image/jpeg,image/png";
      if (type.indexOf(file.type) > -1 && file.type != '') {
        isJPG = true;
      } else {
        isJPG = false;
      }
      //判断图片大小，不能大于4M
      if (((file.size / 1024 / 1024).toFixed(2) - 4) < 0) {
        isLt4M = true;
      } else {
        isLt4M = false;
      }
      if (this.images.length) {
        // console.log(this.images)
        for (let i in this.images) {
          if (this.images[i].name.indexOf(file.name) > -1) {
            isNoExist = false;
            return
          }
        }
      }
      if (!isJPG) {
        message(this, "error", "上传头像图片只能是 jpg、gif、jpeg、png 格式!");
      }
      if (!isLt4M) {
        message(this, "error", "上传头像图片大小不能超过 4MB!");
      }
      if (!isNoExist) {
        message(this, "error", "该案号已存在上传图片，请重新上传！");
      }
      return isJPG && isLt4M && isNoExist;
    },
    //上传成功
    handleSuccess(response, file, fileList) {
      message(this, "success", response.head.message);
      this.downloader();
    },
    //查询当前案号的相关案件材料
    downloader: function() {
      const params = storage.get('case');
      Http.fetch({
          method: "GET",
          url: Http.url.master + "/legal_case/uploadCaseFiles",
          params: {
            case_no: params.case_no
          }
        })
        .then(result => {
          // console.log(result.data)
          let data = result.data;
          if (data.body) {
            this.images = data.body;
          } else {
            this.images = [];
          }
        })
    },
    //从服务器删除案件材料
    removeImage: function(name) {
      this.$confirm('是否从数据库删除此图片？', '提示', {
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action == "confirm") {
            const params = storage.get('case');
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '删除中...';
            Http.fetch({
                method: "DELETE",
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                url: Http.url.master + "/legal_case/uploadCaseFiles",
                data: {
                  case_no: params.case_no,
                  file_name: name
                }
              })
              .then(result => {
                instance.confirmButtonLoading = false;
                let data = result.data;
                if (data.head.status == 200) {
                  done();
                  message(this, "success", "删除成功");
                  this.downloader();
                } else {
                  message(this, "warning", data.head.message);
                }

              })
          } else {
            done();
          }
        },
        callback: action => {
          // if(action =="cancel"){
          //   message(this, "info", "已取消删除");
          // }
        }
      })
    },
    //点击案件材料弹出对话框框
    openOcrModal: function(imageUrl) {
      this.dialogImageVisible = true;
      this.ocrImageUrl = imageUrl;
    },
    //识别图片内容
    ocrMaterial: function() {
      this.ocrResultLoading = true;
      Http.fetch({
          method: "POST",
          url: Http.url.ocr + "/api/ocr_rec_url/",
          data: {
            url: this.ocrImageUrl
          }
        })
        .then(results => {
          this.ocrResultLoading = false;
          // console.log(this.ocrResultLoading)
          const data = results.data;
          if (data.result.res == '') {
            message(this, "error", "您上传的是非文本图片，无法识别文本");
            this.ocrResult = [];
          }
          this.ocrResult = data.result.res;
        })
    },
    //取消图片识别
    handleClose: function(done) {
      this.dialogImageVisible = false;
      this.ocrResult = [];
      done();
    }
  },
  directives: {
    copyButton: {
      // 指令的定义
      bind: function(el, envent) {
        console.log(envent)
        // el.querySelector("#app").remove(".copy");
        // let txt = '';
        // if (document.selection) {
        //   txt = document.selection.createRange().text; //ie
        // } else {
        //   txt = document.getSelection();
        // }
        // let selection = window.getSelection();
        // // console.log( selection );
        // let range = selection.getRangeAt(0)
        // let location = range.getBoundingClientRect(); // { width, height, top, right, bottom, right }
        // let copyContent = txt.toString().replace(/ /g, '').replace(/\n/g, "");
        // // console.log(copyContent);
        // //首先创建div
        // let temp = "<button id='ocr_location' titile='点击复制' type='button' class=' copy btn btn-default btn-sm btn-flat'" + "data-clipboard-text='" + copyContent + "' data-clipboard-action='copy' >" +
        //   "<i class='fa fa-paste text-info '>&nbsp;复制&nbsp;</i>" +
        //   "</button>";
        // if (txt.toString() != '') {
        //   el.querySelectorAll("#app").append(temp);
        //   //给div设置样式，比如大小、位置
        //   let cssStr = "display:inline-block;z-index:10000;width:60px;height:30px; position:absolute;left:" + location.left + 'px;top:' + location.top + 'px;';
        //   //将样式添加到div上，显示div
        //   el.querySelector('#ocr_location').attr('style', cssStr);
        // }
      }
    }
  },
  created() {
    const vm = this;
    vm.downloader();
  },
};
