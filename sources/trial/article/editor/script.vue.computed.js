export default {
  isChiefOfficer() {
    if (this.trial.infomation.officer[0].duty === '审判长') {
      return true;
    } else {
      this.trial.infomation.officer[1].duty = '';
      this.trial.infomation.officer[2].duty = '';
      return false;
    }
  }
};
