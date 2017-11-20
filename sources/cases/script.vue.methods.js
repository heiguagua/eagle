import Http from "../common/scripts/http";
import Encrypt from "../common/scripts/encrypt";
import UtilCases from "./script.util";
import { message, storage } from "../common/scripts/helper";

export default {
  newTrial(lawCase, params) {
    storage.set("case",_.assign({}, lawCase, params));
    this.$router.push("/layout/trial/blank");
  },
  // pagination
  changePageSize(size) {
    const vm = this;
    if (size && typeof size === "number") {
      vm.pagination.size = size;
      vm.httpSearch();
    }
  },
  changeCurrentPage(currentPage) {
    const vm = this;
    if (currentPage && typeof currentPage === "number") {
      vm.pagination.current = currentPage;
      vm.httpSearch();
    }
  },
  // http
  httpSearch() {
    const vm = this;
    UtilCases.query({
        // pagination
        pageSize: vm.pagination.size,
        current: vm.pagination.current,
        // search
        closure_flag: vm.search.status,
        case_brief: vm.search.reason,
        case_no: vm.search.code,
        parties: vm.search.name,
      })
      .then(result => {
        const data = result.data;
        if (Http.protocol(data, 200)) {
          vm.cases = data.body;
          vm.pagination.total = data.head.total;
          message(vm, "info", data.head.message);
        } else {
          message(vm, "warning", data.head.message);
        }
      })
  },
  httpSave() {
    const vm = this;
    UtilCases.create({
        accuser: vm.dialog.case.accuser,
        defendant: vm.dialog.case.accused,
        case_no: vm.dialog.case.code,
        case_brief: vm.dialog.case.reason,
        hearing_procedure: vm.dialog.case.process,
        accepted_date: vm.dialog.case.date,
        category: "民事一审",
        doc_type: "民事判决书",
        court_name: "四川省成都市武侯区人民法院",
      })
      .then(result => {
        const data = result.data;
        if (Http.protocol(data, 200)) {
          vm.httpSearch();
          vm.dialog.show = false;
          message(vm, "info", data.head.message);
        } else {
          message(vm, "warning", data.head.message);
        }
      })
  }
};
