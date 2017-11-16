import Trial from './script.vue.data.trial';
import { message, notify } from '../../../../common/scripts/helper';

export default {
  // 原告事件
  accuserHandler(target, operation, params) {
    const vm = this;
    switch (target) {
      case 'accuser':
        {
          // 添加
          if (operation === 'add') {
            const vm = this;
            const accuser = Trial().verification.participator.accusers[0];
            this.trial.verification.participator.accusers.push(accuser);
            notify(vm, 'success', '温馨提示：诉讼参予人-原告添加成功！', '成功');
          }
          // 删除
          else if (operation === 'remove') {
            const vm = this;
            if (params.index !== 0) {
              const accusers = vm.trial.verification.participator.accusers;
              accusers.splice(params.index, 1);
            }
            notify(vm, 'warning', '温馨提示：不能删除第1位原告！', '成功');
          }
        }
        break;
      case 'subject':
        {
          // 添加
          if (operation === 'add') {

          }
          // 删除
          else if (operation === 'remove') {

          }
        }
        break;
      case 'responsible':
        {
          // 添加
          if (operation === 'add') {

          }
          // 删除
          else if (operation === 'remove') {

          }
        }
        break;
      case 'agent':
        {
          // 添加
          if (operation === 'add') {

          }
          // 删除
          else if (operation === 'remove') {

          }
        }
        break;
      default:
        {
          notify(vm, 'error', '温馨提示：请传入正确的Handler操作参数！', '错误');
        }
    }
  },
  /* 增加被告 */
  addAccused() {
    const vm = this;
    const accused = Trial().verification.participator.accuseds[0];
    this.trial.verification.participator.accuseds.push(accused);
    notify(vm, 'success', '温馨提示：诉讼参予人-被告添加成功！', '成功');
  },
  /* 增加第三人 */
  addThirdparty() {
    const vm = this;
    const thirdparty = Trial().verification.participator.thirdparties[0];
    this.trial.verification.participator.thirdparties.push(thirdparty);
    notify(vm, 'success', '温馨提示：诉讼参予人-第三人添加成功！', '成功');
  },
};
