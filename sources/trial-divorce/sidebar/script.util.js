import Http from "../../common/scripts/http.js";

export default {
  query: params => {
    return Http.fetch({
      method: "GET",
      url: Http.url.master + "/trial_record/list",
      params: params
    })
  },
};
