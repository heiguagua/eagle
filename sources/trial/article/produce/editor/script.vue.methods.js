import Trial from './script.vue.data.trial';
import { message } from '../../../../common/scripts/helper';

export default {
  /* 增加原告 */
  addAccuser() {
    const vm = this;
    const accuser = Trial().verification.participator.accusers[0];
    this.trial.verification.participator.accusers.push(accuser);
    message(vm, 'success', '温馨提示：诉讼参予人-原告添加成功！');
  },
  /* 删除原告 */
  removeAccuser(index) {
    const accusers = this.trial.verification.participator.accusers;
    accusers.splice(index, 1);
  },
  /*  */
  addAccuserSubject() {

  },
  /* 增加被告 */
  addAccused() {
    const vm = this;
    const accused = Trial().verification.participator.accuseds[0];
    this.trial.verification.participator.accuseds.push(accused);
    message(vm, 'success', '温馨提示：诉讼参予人-被告添加成功！');
  },
  /* 增加第三人 */
  addThirdparty() {
    const vm = this;
    const thirdparty = Trial().verification.participator.thirdparties[0];
    this.trial.verification.participator.thirdparties.push(thirdparty);
    message(vm, 'success', '温馨提示：诉讼参予人-第三人添加成功！');
  },
};
