export default {
  isChiefOfficer() {
    if (this.trial.infomation.officer[0].duty !== '审判长') {
      this.trial.infomation.officer[1] = {};
      this.trial.infomation.officer[2] = {};
      return true;
    }
  }
};
