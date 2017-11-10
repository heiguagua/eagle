<template>
  <div>
    {trial.infomation.date}
    <h1 title="法院名称" id="name" />
    <h2 title="笔录标题" id="title" />
    <p title="庭审信息" id="infomation" />
    <p title="法庭纪律" id="discipline" />
    <p title="信息核对" id="verification">
      <p title="诉讼参与人" id="participator" />
      <p title="异议及理由" id="objection" />
      <p title="证人是否出庭" id="witness" />
    </p>
    <p title="庭审序言" id="preface">
      <p title="庭审组织" id="organize" />
      <p title="告知诉讼权利" id="rights" />
      <p title="告知事项" id="matter" />
      <p title="是否申请回避" id="evasion" />
      <p title="举证期限异议" id="evidence" />
    </p>
    <p title="法庭调查" id="investigate">
      <p title="诉辩意见" id="opinion" />
      <p title="法庭询问" id="inquiry" />
      <p title="举证质证" id="proof" />
      <p title="争点归纳" id="conclude">
        <p title="无争议归纳" id="undisputed" />
        <p title="有争议归纳" id="disputed" />
      </p>
    </p>
    <p title="法庭辩论" id="argument">
      <p title="原告方辩论意见" id="accuser" />
      <p title="被告方辩论意见" id="accused" />
      <p title="第三人辩论意见" id="thirdparty" />
      <p title="庭审总结" id="summary" />
    </p>
    <p title="最后陈述" id="statement" />
    <p title="法庭调解" id="conciliation" />
    <p title="休庭宣读" id="announce" />
    <p title="其他" id="other" />
  </div>
</template>


<script>
import Http from "../../common/scripts/http";
import { storage } from "../../common/scripts/helper";

export default {
  data() {
    return {
      trial: {}
    };
  },
  created() {
    this.trial = storage.get("trial");
  }
};
</script>

<stylelang='scss' scoped>

</style>
