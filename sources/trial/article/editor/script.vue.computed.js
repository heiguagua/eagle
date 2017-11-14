export default {
  isChiefOfficer() {
    if (this.trial.infomation.officer[0].duty === '审判长') {
      return true;
    } else {
      return false;
    }
  }
};
