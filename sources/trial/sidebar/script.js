import UtilSidebar from "./script.util";
import Http from "../../common/scripts/http";
import { mapMutations, mapActions, mapState } from "vuex";
import { message, storage } from "../../common/scripts/helper";
import Encrypt from "../../common/scripts/encrypt.js";
import TrialSidebarList from "./list";
import TrialSidebarOcr from "./ocr";

export default {
  components: {
    TrialSidebarList,
    TrialSidebarOcr,
  },
  data() {
    return {
      activedCollapse: ["trials", "ocr"],
    }
  },
};
