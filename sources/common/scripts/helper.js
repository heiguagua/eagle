// export const chart = (selector = '', option = {}) => {
//   echarts.init(document.querySelector(selector)).setOption(option);
// };

export const message = (vm, type, message) => {
  vm.$message({
    type: type || 'info',
    message: message || ''
  })
};
