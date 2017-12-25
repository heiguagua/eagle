import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import Trial from "../script.vue.data.trial";

export default {
  addNum(type, parentType,trial) {
    const vm = this;
    let i = 1;
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
      return item.showFlag === true;
    });
    //被告到庭情况
    tempArray_2 = defendant.filter(function(item) {
      return item.showFlag === true;
    });
    //第三人到庭情况
    tempArray_3 = third.filter(function(item) {
      return item.showFlag === true;
    });

    /**全部缺席和全部到庭 start**/
    if (tempArray_2.length && tempArray_3.length || tempArray_2.length && !third.length) {
      trial.verification.other.attendanceFlag = true;
    } else if (!tempArray_2.length && !tempArray_3.length) {
      trial.verification.other.attendanceFlag = false;
    }
    /** end **/

    /**部分缺席显示字段 start**/
    tempArray_2.length ? (trial.verification.other.defendantPartFlag = true) : (trial.verification.other.defendantPartFlag = false);
    tempArray_3.length ? (trial.verification.other.thirdPartFlag = true) : (trial.verification.other.thirdPartFlag = false);
    tempArray_3.length ? (trial.verification.other.thirdManFlag = true) : (trial.verification.other.thirdManFlag = false);

    if (!third.length) {
      trial.verification.other.thirdPartFlag = true
      trial.verification.other.thirdManFlag = false
    }
    this.show2hide(trial, 'accuseds', 'defendantFlag');
    this.show2hide(trial, 'thirdparties', 'thirdFlag');
    /** end **/

    // 加字段（absence）//部分缺席或者全部缺席的情况
    if (((!trial.verification.other.defendantPartFlag && trial.verification.other.thirdPartFlag) || (trial.verification.other.defendantPartFlag && !trial.verification.other.thirdPartFlag)) || !trial.verification.other.attendanceFlag || trial.verification.other.defendantFlag || trial.verification.other.thirdFlag) {
      // trial.verification.other.absence = 1;
      trial.verification.other.absenseStatus = true;
    } else {
      // trial.verification.other.absence = 0;
      trial.verification.other.absenseStatus = false;
    };

    // 被告缺席时 absence = 1 
    if (!(trial.verification.other.defendantPartFlag && (trial.verification.participator.accuseds.length > 0) )) {
      trial.verification.other.absence = 1;
    }else {
      trial.verification.other.absence = 0;
    }
  },
  show2hide: function(trial,str1, str2) {
    const vm = this;
    trial.verification.other[str2] = false;
    if (trial.verification.participator[str1].length > 1) {
      trial.verification.participator[str1].forEach(function(item) {
        if (vm.isType(item) === 'Object') {
          let array = [];
          for (let i in item) {
            if (i !== '$$hashKey') {
              array = array.concat(item[i]);
            }
          }
          if (array.length) {
            let tempArray = array.filter(function(item) {
              return item.showFlag === true;
            });
            if (!tempArray.length) {
              trial.verification.other[str2] = true;
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
      if (vm.isType(trial.verification.participator[i]) === 'Array') {
        trial.verification.participator[i].forEach(function(v) {
          all = all.concat(vm.for2Array(v));
        });
        if (i === 'accuseds') {
          trial.verification.participator[i].forEach(function(v) {
            defendantArray = defendantArray.concat(vm.for2Array(v));
          });
        }
        if (i === 'thirdparties') {
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
    const vm = this;
    let tempArray = [];
    if (vm.isType(data) === 'Object') {
      for (let i in data) {
        if (vm.isType(data[i]) === 'Array') {
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
  //将未到庭人员信息保存（诉讼地位名：姓名）
  getAbsentee: function(trial) {
    const vm = this;
    trial.verification.other.absentee = [];
    for (let i in trial.verification.participator) {
      trial.verification.participator[i].forEach(function(item) {
        let a = [],
          b = [],
          c = [],
          flag = false,
          count = 0;
        for (let j in item) {
          if (vm.isType(item[j]) === 'Array' && item[j].length) {
            a = item[j].filter(function(i) {
              return i.isAppear == "未到庭";
            });
            b = b.concat(a);
            item[j].forEach(function(item) {
              count++;
            })
          }
        }
        if (b.length === count) {
          flag = true;
        }
        for (let k in item) {
          if (vm.isType(item[k]) === 'Array') {
            item[k].forEach(function(v) {
              if (v.isAppear == "未到庭" && flag) {
                trial.verification.other.absentee.push({
                  name: v.name,
                  type: v.type
                });
              }
            });
          }
        }
      })
    }
  },
  //将到庭人员信息保存
  getToCourt: function(trial) {
    const vm = this;
    trial.verification.other.toCourtMan = [];
    for (var i in trial.verification.participator) {
      trial.verification.participator[i].forEach(function(item) {
        for (var j in item) {
          if (vm.isType(item[j]) === 'Array') {
            item[j].forEach(function(v) {
              if (v.isAppear == "到庭") {
                trial.verification.other.toCourtMan.push({
                  name: v.name,
                  type: v.type,
                  parentType: v.parentType
                });
              }
            });
          }
        }
      });
    }
  }
}