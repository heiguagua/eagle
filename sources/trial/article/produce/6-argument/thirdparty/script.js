import { mapMutations, mapActions, mapState, mapGetters } from "vuex";

class DataBase { 
  constructor(participator,item,flag){
    this.participator = participator;
    flag === true ? (this.item = item - 1) : (this.item = item + 1)
    this.flag = flag; //表示是添加还是删除(false ==> 删除  true ==> 添加)
    this.getData()
    this.updataItemData()
  }
  getData(){
    this.accuseds = this.participator.accuseds
    this.accusers = this.participator.accusers
    this.thirdparties = this.participator.thirdparties
  }
  updataItemData(){
    this.updata(this.accuseds)
    this.updata(this.accusers)
    this.updata(this.thirdparties)
  }
  updata(data,key){
    data.forEach((item) => {
      if(this.flag){
        this.addChildren(item.subjects)
        this.addChildren(item.responsibles)
        this.addChildren(item.agents)
      }else{
        this.removeChildren(item.subjects)
        this.removeChildren(item.responsibles)
        this.removeChildren(item.agents)
      }
    })
  }
  addChildren(data){
    data.forEach(item => {
      item.argument.detail[this.item] = ''
    })
  }
  removeChildren(data){
    data.forEach(item => {
    if(this.item <= 0){
      this.item = 1
    }
    delete item.argument.detail[this.item]
    })
  }
}
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState("Trial", [
      "trial",
      "options"
    ]),
  },
  methods: {
    addTrial: function() {
      this.trial.argument.other.debateArray = [];
      this.trial.argument.other.debateTimes++;
      for (var i = 1, len = this.trial.argument.other.debateTimes; i < len; i++) {
        this.trial.argument.other.debateArray.push({
          count: i
        });
      }
      let database = new DataBase(this.trial.verification.participator,this.trial.argument.other.debateTimes,true)
      state.trial.verification.participator = database.participator

    },
    //删除评论次数
    delDebate: function(index) {
      this.trial.argument.other.debateArray.splice(index, 1);
      this.trial.argument.other.debateTimes--;
      let database = new DataBase(this.trial.verification.participator,this.trial.argument.other.debateTimes,false)
      state.trial.verification.participator = database.participator
    }
  },
};
