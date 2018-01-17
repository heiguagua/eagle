import Http from "../../../../common/scripts/http";
import { message, storage } from "../../../../common/scripts/helper";
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import $ from "jquery"

export default {
  data() {
    return {
      case: {},
      trial: {},
      commonStyle: {
        lineHeight: "30pt",
        margin: "0 -0.1cm",
        fontFamily: "仿宋",
        fontSize: "16pt",
        textIndent: "30pt",
        textAlign: "justify",
        textJustify: "inter-ideograph"
      },
      indentStyle: {
        lineHeight: "30pt",
        margin: "0 -0.1cm",
        fontFamily: "仿宋",
        fontSize: "16pt",
        textIndent: "0",
        textAlign: "justify",
        textJustify: "inter-ideograph"
      },
      center: {
        textAlign: "center",
      },
      right: {
        textAlign: "right",
      },
      pMargin: {
        margin: "0"
      }
    };
  },
  computed: {
    ...mapState("Trial", [
      "template"
    ]),
  },
  created() {
    this.case = storage.get("case");
    this.trial = storage.get("trial");
  },
  mounted() {
    let className = this.trial.adjourn;
    this.detailAdjournDom(className);
  },
  methods: {
    save() {},
    detailAdjournDom(className) {
      if (className) {
        let array = className.split("-");
        // console.log(array)
        const announce = $("."+array[0]).nextAll().filter(".announce");
        const other = $("."+array[0]).nextAll().filter(".other");
        //  console.log(announce)
        if (array.length == 1) {
         $("."+className).nextAll().remove();
        }else if(array.length == 2){
          if(className =='investigate-fact'){
            $("."+array[0]).nextAll().remove();
          }else{
            $("."+className).nextAll().remove();
            $("."+className).parent().nextAll().remove();
          }
        }else if(array.length == 3){
          $("."+className).nextAll().remove();
          $("."+className).parent().nextAll().remove();
          $("."+className).parent().parent().nextAll().remove();
        }
        $("#content-wrap").append(announce).append(other);
      }
    }
  }
};