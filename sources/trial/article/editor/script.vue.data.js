export default {
  trial: {
    // 法院名称
    name: '成都市武侯区人民法院',
    // 笔录标题
    title: '民事案件审判笔录',
    // 庭审信息
    infomation: {
      date: '',
      time: {
        start: '',
        end: ''
      },
      location: {
        name: '',
        number: '',
        times: ''
      },
      code: '',
      reason: '',
      isPublic: '',
      appear: ''
    },
    // 法庭纪律
    discipline: '',
    // 信息核对
    verification: {
      // 诉讼参与人
      participator: '',
      // 异议及理由
      objection: '',
      // 证人是否出庭
      witness: '',
    },
    // 庭审序言
    preface: {
      // 庭审组织
      organize: '',
      // 告知诉讼权利
      rights: '',
      // 告知事项
      matter: '',
      // 是否申请回避
      evasion: '',
      // 举证期限异议
      evidence: ''
    },
    // 法庭调查
    investigate: {
      // 诉辩意见
      opinion: '',
      // 法庭询问
      inquiry: '',
      // 举证质证
      proof: '',
      // 争点归纳
      conclude: {
        // 无争议归纳
        undisputed: '',
        // 有争议归纳
        disputed: ''
      }
    },
    // 法庭辩论
    argument: {
      // 原告方辩论意见
      accuser: '',
      // 被告方辩论意见
      accused: '',
      // 第三人辩论意见
      thirdparty: '',
      // 庭审总结
      summary: '',
    },
    // 最后陈述
    statement: '',
    // 法庭调解
    conciliation: '',
    // 休庭宣读
    announce: '',
    // 其他
    other: ''
  },
  options: {
    roles: [
      [{
        '审判长': '',
        '代理审判员': ''
      }]
    ],
    absent: {
      yes: '到庭',
      no: '未到庭',
    }
  }
}
