import UtilSidebar from "./script.util";
import Http from "../../common/scripts/http";
import { mapMutations, mapActions, mapState } from "vuex";
import { message, storage } from "../../common/scripts/helper";
import Encrypt from "../../common/scripts/encrypt.js";

export default {
  data() {
    const params = storage.get('case');
    const token = Encrypt.token.get();
    return {
      activedCollapse: ["trials", "ocr"],
      fileList: [],
      images: [],
      headers: {
        "Authorization": "Wiserv " + token
      },
      uploadUrl: Http.url.master + "/legal_case/uploadCaseFiles", //上传材料地址
      uploadData: {
        case_no: params.case_no
      } //上传材料参数
    }
  },
  computed: {
    ...mapState("Trial", [
      "trials"
    ]),
  },
  created() {
    const vm = this;
    this.getTrials({ vm });
    this.downloader();
  },
  methods: {
    ...mapActions("Trial", [
      "getTrials",
    ]),
    ...mapMutations("Trial", [
      "setTrial",
      "setOptions"
    ]),
    removeTrial(row) {
      const vm = this;
      const recordID = row.record_id || "";
      const case_no = row.case_no || "";
      Http.fetch({
          method: "DELETE",
          url: Http.url.master + "/trial/" + recordID + "/" + case_no,
        })
        .then(result => {
          const data = result.data;
          if (Http.protocol(data, 200)) {
            message(vm, "info", data.head.status);
            vm.getTrials({ vm })
          } else {
            message(vm, "warning", data.head.message);
          }
        });
    },
    updateTrial(row) {
      const vm = this;
      const recordID = row.record_id || "";
      const case_no = row.case_no || "";
      Http.fetch({
          method: "GET",
          url: Http.url.master + "/trial/" + recordID,
          params: {
            record_id: recordID,
          }
        })
        .then(result => {
          const data = result.data;
          if (Http.protocol(data, 200) && data.body.length !== 0) {
            const updateTrial = data.body[0].json
            storage.set('trial', updateTrial);
            message(vm, "info", data.head.message);
          } else {
            message(vm, "warning", data.head.message);
          }
        })
        .then(result => {
          vm.$router.replace({ path: "/layout/trial/blank", query: { operation: "update" } });
        })
        .then(result => {
          vm.$router.replace({ path: "/layout/trial/produce", query: { operation: "update" } });
        })
    },
    //过滤上传图片格式、大小
    beforeAvatarUpload(file) {
      let isJPG = false, //图片格式是否正确
        isLt4M = false, //图片大小是否正确
        isNoExist=true;//图片是否已存在
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
        for (var i in this.images) {
          if (this.images[i].name.indexOf(file.name) > -1) {
            isNoExist=false;
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
            for (var i in data.body) {
              data.body[i].name = data.body[i].url.substr(data.body[i].url.lastIndexOf('/') + 1)
            }
            this.images = data.body;
          }else {
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
          if(action =="confirm"){
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
          }else{
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
    //点击案件材料弹出模态框
    openOcrModal: function(image){

    }

  }

};