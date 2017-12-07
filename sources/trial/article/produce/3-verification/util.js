import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import Trial from "../script.vue.data.trial";

export default {
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
  },
  showSetting: function(trial) {
    const vm = this;
    let allList = null,
      defendant = null,
      third = null,
      tempArray_1, tempArray_2, tempArray_3;
    let obj = this.concatArray(trial);
    allList = obj.all;
    defendant = obj.defendantArray;
    third = obj.thirdArray;

    //全部数据到庭情况  
    tempArray_1 = allList.filter(function(item) {
      return item.show_flag === true;
    });
    //被告到庭情况
    tempArray_2 = defendant.filter(function(item) {
      return item.show_flag === true;
    });
    //第三人到庭情况
    tempArray_3 = third.filter(function(item) {
      return item.show_flag === true;
    });

    /**全部缺席和全部到庭 start**/
    if (tempArray_2.length && tempArray_3.length || tempArray_2.length && !third.length) {
      trial.verification.participator.other.attendance_flag = true;
    } else if (!tempArray_2.length && !tempArray_3.length) {
      trial.verification.participator.other.attendance_flag = false;
    }
    /** end **/

    /**部分缺席显示字段 start**/
    tempArray_2.length ? (trial.verification.participator.other.defendant_part_flag = true) : (trial.verification.participator.other.defendant_part_flag = false);
    tempArray_3.length ? (trial.verification.participator.other.third_part_flag = true) : (trial.verification.participator.other.third_part_flag = false);
    tempArray_3.length ? (trial.verification.participator.other.third_man_flag = true) : (trial.verification.participator.other.third_man_flag = false);

    if (!third.length) {
      trial.verification.participator.other.third_part_flag = true
      trial.verification.participator.other.third_man_flag = false
    }
    this.show2hide(trial, 'accuseds', 'defendant_2_flag');
    this.show2hide(trial, 'thirdparties', 'third_2_flag');
    /** end **/

    // 加字段（absence）
    if (((!trial.verification.participator.other.defendant_part_flag && trial.verification.participator.other.third_part_flag) || (trial.verification.participator.other.defendant_part_flag && !trial.verification.participator.other.third_part_flag)) || !trial.verification.participator.other.attendance_flag || trial.verification.participator.other.defendant_2_flag || trial.verification.participator.other.third_2_flag) {
      trial.verification.participator.other.absence = 1;
    }
  },
  show2hide: function(trial,str1, str2) {
    trial.verification[str2] = false;
    if (trial.verification.participator[str1].length > 1) {
      trial.verification.participator[str1].forEach(function(item) {
        if (this.isType(item) === 'Object') {
          let array = [];
          for (let i in item) {
            if (i !== '$$hashKey') {
              array = array.concat(item[i]);
            }
          }
          if (array.length) {
            let tempArray = array.filter(function(item) {
              return item.show_flag === true;
            });
            if (!tempArray.length) {
              trial.verification[str2] = true;
            }
          }
        }
      })
    }
  },
  /**
   * [concatArray 构造全部数据]
   * @return {[type]} [全部数据]
   */
  concatArray: function(trial) {
    const vm = this;
    let all = [],
      defendantArray = [],
      thirdArray = [];

    for (let i in trial.verification.participator) {
      if (this.isType(trial.verification.participator[i]) === 'Array') {
        trial.verification.participator[i].forEach(function(v) {
          all = all.concat(vm.for2Array(v));
        });
        if (i === 'defendant') {
          trial.verification.participator[i].forEach(function(v) {
            defendantArray = defendantArray.concat(vm.for2Array(v));
          });
        }
        if (i === 'third') {
          trial.verification.participator[i].forEach(function(v) {
            thirdArray = thirdArray.concat(vm.for2Array(v));
          });
        }
      }
    }
    return {
      all: all,
      defendantArray: defendantArray,
      thirdArray: thirdArray
    };
  },
  /**
   * [for2Array 构造全部数据]
   * @param  {[type]} data [每个类型的数据]
   * @return {[type]}      [description]
   */
  for2Array: function(data) {
    let tempArray = [];
    if (this.isType(data) === 'Object') {
      for (let i in data) {
        if (this.isType(data[i]) === 'Array') {
          tempArray = tempArray.concat(data[i]);
        }
      }
    }
    return tempArray;
  },
  /**
   * [isType 类型判断]
   * @param  {[type]}  data [数据]
   * @return {Boolean}      [类型]
   */
  isType: function(data) {
    let type = Object.prototype.toString.call(data);
    switch (type) {
      case '[object Array]':
        return 'Array';
      case '[object Object]':
        return 'Object';
      case '[object String]':
        return 'String';
      case '[object Function]':
        return 'Function';
    }
  },
}