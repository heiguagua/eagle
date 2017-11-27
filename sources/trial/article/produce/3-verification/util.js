import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import Trial from "../script.vue.data.trial";

export default {
  // computed: {
    // ...mapState("Trial", [
    //   "trial",
    //   "options"
    // ]),
  // },
  addNum(type, parentType,trial) {
    const vm = this;
    let i = 1;
    // let accuser = vm.article.store.data.verify.personList[parentType];
    let accuser = trial.verification.participator[parentType];
    let _tempArray = [];
    if (accuser[0][type].length === 1) {
      accuser[0][type][0]['ordinal'] = 1;
    }
    accuser.forEach(function(item) {
      _tempArray = _tempArray.concat(item[type]);
    });

    return _tempArray;
  },
  updateNum(type, parentType,trial) {
    const vm = this;
    let i = 1;
    // let accuser = vm.article.store.data.verify.personList[parentType];
    let accuser = trial.verification.participator[parentType];
    if (!type) {
      accuser.forEach(function(item) {
        for (let k in item) {
          if (_.isArray(item[k])) {
            item[k].forEach(function(kk, index, array) {
              if (array.length === 1 && accuser.length <= 1) {
                kk.ordinal = '';
              } else {
                kk.ordinal = i;
                if (kk.type == "原告" || kk.type == "被告" || kk.type == "第三人") {
                  i++;
                }
              }
            });
          }
        }
      });
    } else {
      accuser.forEach(function(item) {
        if (_.isArray(item[type])) {
          item[type].forEach(function(vv, i, array) {
            if (array.length === 1) {
              vv.ordinal = '';
            } else {
              i++;
              vv.ordinal = i;
            }
          });
        }
      });
    }
  }
}