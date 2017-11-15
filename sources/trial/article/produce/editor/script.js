export default {
  data() {
    return {
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
          code: '', // 案号
          reason: '', // 案由
          isPublic: '公开', // 是否公开审理
          audience: '', // 旁听人数
          officer: [ // 审判人员
            { duty: '审判长', name: '' },
            { duty: '审判员', name: '' },
            { duty: '审判员', name: '' },
          ],
          clerk: '', // 书记员
        },
        // 法庭纪律
        // discipline: '',
        // 信息核对
        verification: {
          // 诉讼参与人
          participator: {
            // 原告
            accusers: [{
              // 诉讼主体
              subjects: [{
                name: '', // 名称
                info: '', // 信息
                isAppear: '到庭', // 是否出庭
              }],
              // 责任人
              responsibles: [{
                role: '法定代表人', // 角色
                name: '', // 名称
                info: '', // 信息
                isAppear: '到庭', // 是否出庭
              }],
              // 代理人
              agents: [{
                name: '', // 名称
                info: '', // 信息
                isAppear: '到庭', // 是否出庭
                auth: '特别授权',
              }],
            }],
            // 被告
            accuseds: [{
              // 诉讼主体
              subjects: [{

              }],
              // 责任人
              responsibles: [{

              }],
              // 代理人
              agents: [{

              }],
            }],
            // 第三人
            thirdparties: [{
              // 诉讼主体
              subjects: [{

              }],
              // 责任人
              responsibles: [{

              }],
              // 代理人
              agents: [{

              }],
            }],
          },
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
        other: 'hank'
      },
      options: {
        duties: [
          [
            '审判长',
            '审判员',
            '代理审判员',
          ],
          [
            '审判员',
            '代理审判员',
            '人民陪审员',
          ]
        ],
        authStatus: [
          '特别授权',
          '一般代理'
        ],
        responsibles: [
          '法定代表人',
          '负责人',
          '法定代理人',
          '指定代理人',
        ],
        appearStatus: [
          '到庭',
          '未到庭',
        ],
        publicStatus: [
          '公开',
          '不公开',
        ]
      },
    }
  },
  computed: {
    isChiefOfficer() {
      if (this.trial.infomation.officer[0].duty === '审判长') {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {},
  mounted() {},
  directives: {}
};