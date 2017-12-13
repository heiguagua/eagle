// export const chart = (selector = "", option = {}) => {
//   echarts.init(document.querySelector(selector)).setOption(option);
// };
import Shortid from "shortid";

export const ID = () => {
  return Shortid.generate();
};

export const message = (vm, type, message) => {
  vm.$message({
    type: type || "info",
    message: message || ""
  })
};

export const notify = (vm, type, message, title) => {
  vm.$notify({
    type: type || "info",
    message: message || "",
    title: title || "",
  })
};

export const confirm = (vm, type, message) => {
  return vm.$confirm(
    message || "是否确认进行操作？",
    "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type
    })
};

export const storage = {
  get(key) {
    if (key) {
      return JSON.parse(sessionStorage.getItem(key));
    } else {
      console.warn("Session Storage GET Error：" + key);
    }
  },
  set(key, value) {
    if (key && value) {
      sessionStorage.setItem(key, JSON.stringify(value));
    } else {
      console.warn("Session Storage SET Error：" + key + value);
    }
  },
  remove(key) {
    if (key) {
      sessionStorage.removeItem(key);
    }
  }
};
