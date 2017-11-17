import Trial from './script.vue.data.trial';
import { message, notify } from '../../../../common/scripts/helper';

export default {
  // 原告事件处理
  accuserHandler(target, operation, params) {
    const vm = this;
    switch (target) {
      case 'accuser':
        {
          // 添加
          if (operation === 'add') {
            const accuser = Trial().verification.participator.accusers[0];
            this.trial.verification.participator.accusers.push(accuser);
            message(vm, 'success', '温馨提示：原告添加成功！');
          }
          // 删除
          else if (operation === 'remove') {
            if (params.index !== 0) {
              const accusers = vm.trial.verification.participator.accusers;
              accusers.splice(params.index, 1);
              message(vm, 'warning', '温馨提示：原告删除成功！');
            } else {
              message(vm, 'error', '温馨提示：不能删除首位原告！');
            }
          }
        }
        break;
      case 'subject':
        {
          // 添加
          if (operation === 'add') {
            let accuserIndex = params.accuserIndex;
            let originSubject = Trial().verification.participator.accusers[0].subjects[0];
            let targetSubject = this.trial.verification.participator.accusers[accuserIndex].subjects.push(originSubject);
            message(vm, 'success', '温馨提示：原告诉讼主体添加成功！');
          }
          // 删除
          else if (operation === 'remove') {
            console.log(params.subjectIndex);
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
