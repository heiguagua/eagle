export default {
  isChiefOfficer() {
    return (this.trial.infomation.officer[0].duty === "审判长") ? true : false;
  }
};
