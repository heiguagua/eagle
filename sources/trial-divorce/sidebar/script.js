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
