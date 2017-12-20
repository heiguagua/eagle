export default () => {
  return {
    // 休庭位置
    adjourn: "",
    // 笔录头部
    head: {
      // 法院名称
      name: "成都市武侯区人民法院",
      // 笔录标题
      title: "民事案件审判笔录",
    },
    // 庭审信息
    infomation: {
      date: "",
      time: {
        start: "",
        end: ""
      },
      location: {
        name: "",
        number: "", //开庭次数
        times: ""
      },
      code: "", // 案号
      reason: "", // 案由
      isPublic: "公开", // 是否公开审理
      audience: "0", // 旁听人数
      officer: [ // 审判人员
        { duty: "审判长", name: "" },
        { duty: "审判员", name: "" },
        { duty: "审判员", name: "" },
      ],
      clerk: "", // 书记员
    },
    // 法庭纪律
    // discipline: "",
    // 信息核对
    verification: {
      // 诉讼参与人
      participator: {
        // 原告
        accusers: [{
          // 诉讼主体
          subjects: [{
            ordinal: "", // 序数
            name: "", // 名称
            info: "", // 信息
            isAppear: "到庭", // 是否出庭
            showFlag: true, //到庭显示，未到庭隐藏（针对所有诉讼参与人对应的列表）
            parentType: "原告",
            type: "原告",
            // 异议及理由
            objection: {
              status: "无异议",
              detail: "",
            },
            //异议及理由-缺席审理
            absenceObjection: {
              detail: "清楚。"
            },
            // 证人是否出庭
            witness: {
              detail: "无",
            },
            // 告知诉讼权利
            rights: {
              detail: "收到，清楚。",
            },
            // 告知事项
            matter: {
              detail: "清楚。",
            },
            // 是否申请回避
            evasion: {
              status: "不申请",
              detail: "",
            },
            // 举证期限异议
            evidence: {
              status: "无异议",
              isAgree: "同意",
              detail: "",
            },
            // 诉辩意见
            opinion: {
              detail: "",
            },
            // 诉辩意见-缺席审理
            absenceOpinion: {
              detail: "清楚。"
            },
            // 无争议归纳
            undisputed: {
              isObjection: "无异议", // 是否有异议
              isSupply: "无补充", // 是否有补充
            },
            // 争议归纳
            disputed: {
              isObjection: "无异议", // 是否有异议
              isSupply: "无补充", // 是否有补充
            },
            // 法庭询问
            inquiry: [],
            // 法庭辩论
            argument: [{
              detail: "",
            }],
            //法庭辩论-缺席审理
            absenceArgument: {
              detail: "清楚。"
            },
            // 最后陈述
            statement: {
              detail: "",
            },
            // 最后陈述-缺席审理
            absenceStatement: {
              detail: "清楚。"
            },
            // 法庭调解
            conciliation: {
              status: "愿意",
              detail: "",
              standpoint: "清楚。",
            },
            // 法庭调解-缺席审理
            absenceConciliation: {
              detail: "清楚。"
            },
            // 法庭调解-不同意调解
            disagreeConciliation: {
              detail: "清楚。"
            },
            // 举证质证
            proof: {
              // 举证内容
              detail: "",
              // 质证意见
              sugestion: {
                toAccuser: "", // 对于原告举证的质证意见
                toAccused: "", // 对于被告举证的质证意见
                toThirdparty: "", // 对于第三人举证的质证意见
              },
              // 是否需要交叉询问或补充调查
              requirement: {
                status: "无",
                detail: "",
              },
            },
          }],
          // 责任人
          responsibles: [{
            role: "法定代表人", // 角色
            name: "", // 名称
            info: "", // 信息
            isAppear: "到庭", // 是否出庭
            showFlag: true, //到庭显示，未到庭隐藏（针对所有诉讼参与人对应的列表）
            parentType: "原告",
            type: "原告法定代表人",
            // 异议及理由
            objection: {
              status: "无异议",
              detail: "",
            },
            //异议及理由-缺席审理
            absenceObjection: {
              detail: "清楚。"
            },
            // 证人是否出庭
            witness: {
              detail: "无",
            },
            // 告知诉讼权利
            rights: {
              detail: "收到，清楚。",
            },
            // 告知事项
            matter: {
              detail: "清楚。",
            },
            // 是否申请回避
            evasion: {
              status: "不申请",
              detail: "",
            },
            // 举证期限异议
            evidence: {
              status: "无异议",
              isAgree: "同意",
              detail: "",
            },
            // 诉辩意见
            opinion: {
              detail: "",
            },
            // 诉辩意见-缺席审理
            absenceOpinion: {
              detail: "清楚。"
            },
            // 无争议归纳
            undisputed: {
              isObjection: "无异议", // 是否有异议
              isSupply: "无补充", // 是否有补充
            },
            // 争议归纳
            disputed: {
              isObjection: "无异议", // 是否有异议
              isSupply: "无补充", // 是否有补充
            },
            // 法庭询问
            inquiry: [],
            // 法庭辩论
            argument: [{
              detail: "",
            }],
            //法庭辩论-缺席审理
            absenceArgument: {
              detail: "清楚。"
            },
            // 最后陈述
            statement: {
              detail: "",
            },
            // 最后陈述-缺席审理
            absenceStatement: {
              detail: "清楚。"
            },
            // 法庭调解
            conciliation: {
              status: "愿意",
              detail: "",
              standpoint: "清楚。",
            },
            // 法庭调解-缺席审理
            absenceConciliation: {
              detail: "清楚。"
            },
            // 法庭调解-不同意调解
            disagreeConciliation: {
              detail: "清楚。"
            },
            // 举证质证
            proof: {
              // 举证内容
              detail: "",
              // 质证意见
              sugestion: {
                toAccuser: "", // 对于原告举证的质证意见
                toAccused: "", // 对于被告举证的质证意见
                toThirdparty: "", // 对于第三人举证的质证意见
              },
              // 是否需要交叉询问或补充调查
              requirement: {
                status: "无",
                detail: "",
              },
            },
          }],
          // 代理人
          agents: [{
            name: "", // 名称
            info: "", // 信息
            isAppear: "到庭", // 是否出庭
            showFlag: true, //到庭显示，未到庭隐藏（针对所有诉讼参与人对应的列表）
            auth: "特别授权",
            parentType: "原告",
            type: "原告委托诉讼代理人",
            // 异议及理由
            objection: {
              status: "无异议",
              detail: "",
            },
            //异议及理由-缺席审理
            absenceObjection: {
              detail: "清楚。"
            },
            witness: {
              detail: "无",
            },
            // 告知诉讼权利
            rights: {
              detail: "收到，清楚。",
            },
            // 告知事项
            matter: {
              detail: "清楚。",
            },
            // 是否申请回避
            evasion: {
              status: "不申请",
              detail: "",
            },
            // 举证期限异议
            evidence: {
              status: "无异议",
              isAgree: "同意",
              detail: "",
            },
            // 诉辩意见
            opinion: {
              detail: "",
            },
            // 诉辩意见-缺席审理
            absenceOpinion: {
              detail: "清楚。"
            },
            // 无争议归纳
            undisputed: {
              isObjection: "无异议", // 是否有异议
              isSupply: "无补充", // 是否有补充
            },
            // 争议归纳
            disputed: {
              isObjection: "无异议", // 是否有异议
              isSupply: "无补充", // 是否有补充
            },
            // 法庭询问
            inquiry: [],
            // 法庭辩论
            argument: [{
              detail: "",
            }],
            //法庭辩论-缺席审理
            absenceArgument: {
              detail: "清楚。"
            },
            // 最后陈述
            statement: {
              detail: "",
            },
            // 最后陈述-缺席审理
            absenceStatement: {
              detail: "清楚。"
            },
            // 法庭调解
            conciliation: {
              status: "愿意",
              detail: "",
              standpoint: "清楚。",
            },
            // 法庭调解-缺席审理
            absenceConciliation: {
              detail: "清楚。"
            },
            // 法庭调解-不同意调解
            disagreeConciliation: {
              detail: "清楚。"
            },
            // 举证质证
            proof: {
              // 举证内容
              detail: "",
              // 质证意见
              sugestion: {
                toAccuser: "", // 对于原告举证的质证意见
                toAccused: "", // 对于被告举证的质证意见
                toThirdparty: "", // 对于第三人举证的质证意见
              },
              // 是否需要交叉询问或补充调查
              requirement: {
                status: "无",
                detail: "",
              },
            },
          }],
        }],
        // 被告
        accuseds: [{
          // 诉讼主体
          subjects: [{
            ordinal: "", // 序数
            name: "", // 名称
            info: "", // 信息
            isAppear: "到庭", // 是否出庭
            showFlag: true, //到庭显示，未到庭隐藏（针对所有诉讼参与人对应的列表）
            parentType: "被告",
            type: "被告",
            // 异议及理由
            objection: {
              status: "无异议",
              detail: "",
            },
            //异议及理由-缺席审理
            absenceObjection: {
              detail: "清楚。"
            },
            witness: {
              detail: "无",
            },
            // 告知诉讼权利
            rights: {
              detail: "收到，清楚。",
            },
            // 告知事项
            matter: {
              detail: "清楚。",
            },
            // 是否申请回避
            evasion: {
              status: "不申请",
              detail: "",
            },
            // 举证期限异议
            evidence: {
              status: "无异议",
              isAgree: "同意",
              detail: "",
            },
            // 诉辩意见
            opinion: {
              detail: "",
            },
            // 诉辩意见-缺席审理
            absenceOpinion: {
              detail: "清楚。"
            },
            // 无争议归纳
            undisputed: {
              isObjection: "无异议", // 是否有异议
              isSupply: "无补充", // 是否有补充
            },
            // 争议归纳
            disputed: {
              isObjection: "无异议", // 是否有异议
              isSupply: "无补充", // 是否有补充
            },
            // 法庭询问
            inquiry: [],
            // 法庭辩论
            argument: [{
              detail: "",
            }],
            //法庭辩论-缺席审理
            absenceArgument: {
              detail: "清楚。"
            },
            // 最后陈述
            statement: {
              detail: "",
            },
            // 最后陈述-缺席审理
            absenceStatement: {
              detail: "清楚。"
            },
            // 法庭调解
            conciliation: {
              status: "愿意",
              detail: "",
              standpoint: "清楚。",
            },
            // 法庭调解-缺席审理
            absenceConciliation: {
              detail: "清楚。"
            },
            // 法庭调解-不同意调解
            disagreeConciliation: {
              detail: "清楚。"
            },
            // 举证质证
            proof: {
              // 举证内容
              detail: "",
              // 质证意见
              sugestion: {
                toAccuser: "", // 对于原告举证的质证意见
                toAccused: "", // 对于被告举证的质证意见
                toThirdparty: "", // 对于第三人举证的质证意见
              },
              // 是否需要交叉询问或补充调查
              requirement: {
                status: "无",
                detail: "",
              },
            },
          }],
          // 责任人
          responsibles: [{
            role: "法定代表人", // 角色
            name: "", // 名称
            info: "", // 信息
            isAppear: "到庭", // 是否出庭
            showFlag: true, //到庭显示，未到庭隐藏（针对所有诉讼参与人对应的列表）
            parentType: "被告",
            type: "被告法定代表人",
            // 异议及理由
            objection: {
              status: "无异议",
              detail: "",
            },
            //异议及理由-缺席审理
            absenceObjection: {
              detail: "清楚。"
            },
            witness: {
              detail: "无",
            },
            // 告知诉讼权利
            rights: {
              detail: "收到，清楚。",
            },
            // 告知事项
            matter: {
              detail: "清楚。",
            },
            // 是否申请回避
            evasion: {
              status: "不申请",
              detail: "",
            },
            // 举证期限异议
            evidence: {
              status: "无异议",
              isAgree: "同意",
              detail: "",
            },
            // 诉辩意见
            opinion: {
              detail: "",
            },
            // 诉辩意见-缺席审理
            absenceOpinion: {
              detail: "清楚。"
            },
            // 无争议归纳
            undisputed: {
              isObjection: "无异议", // 是否有异议
              isSupply: "无补充", // 是否有补充
            },
            // 争议归纳
            disputed: {
              isObjection: "无异议", // 是否有异议
              isSupply: "无补充", // 是否有补充
            },
            // 法庭询问
            inquiry: [],
            // 法庭辩论
            argument: [{
              detail: "",
            }],
            //法庭辩论-缺席审理
            absenceArgument: {
              detail: "清楚。"
            },
            // 最后陈述
            statement: {
              detail: "",
            },
            // 最后陈述-缺席审理
            absenceStatement: {
              detail: "清楚。"
            },
            // 法庭调解
            conciliation: {
              status: "愿意",
              detail: "",
              standpoint: "清楚。",
            },
            // 法庭调解-缺席审理
            absenceConciliation: {
              detail: "清楚。"
            },
            // 法庭调解-不同意调解
            disagreeConciliation: {
              detail: "清楚。"
            },
            // 举证质证
            proof: {
              // 举证内容
              detail: "",
              // 质证意见
              sugestion: {
                toAccuser: "", // 对于原告举证的质证意见
                toAccused: "", // 对于被告举证的质证意见
                toThirdparty: "", // 对于第三人举证的质证意见
              },
              // 是否需要交叉询问或补充调查
              requirement: {
                status: "无",
                detail: "",
              },
            },
          }],
          // 代理人
          agents: [{
            name: "", // 名称
            info: "", // 信息
            isAppear: "到庭", // 是否出庭
            showFlag: true, //到庭显示，未到庭隐藏（针对所有诉讼参与人对应的列表）
            auth: "特别授权",
            parentType: "被告",
            type: "被告委托诉讼代理人",
            // 异议及理由
            objection: {
              status: "无异议",
              detail: "",
            },
            //异议及理由-缺席审理
            absenceObjection: {
              detail: "清楚。"
            },
            witness: {
              detail: "无",
            },
            // 告知诉讼权利
            rights: {
              detail: "收到，清楚。",
            },
            // 告知事项
            matter: {
              detail: "清楚。",
            },
            // 是否申请回避
            evasion: {
              status: "不申请",
              detail: "",
            },
            // 举证期限异议
            evidence: {
              status: "无异议",
              isAgree: "同意",
              detail: "",
            },
            // 诉辩意见
            opinion: {
              detail: "",
            },
            // 诉辩意见-缺席审理
            absenceOpinion: {
              detail: "清楚。"
            },
            // 无争议归纳
            undisputed: {
              isObjection: "无异议", // 是否有异议
              isSupply: "无补充", // 是否有补充
            },
            // 争议归纳
            disputed: {
              isObjection: "无异议", // 是否有异议
              isSupply: "无补充", // 是否有补充
            },
            // 法庭询问
            inquiry: [],
            // 法庭辩论
            argument: [{
              detail: "",
            }],
            //法庭辩论-缺席审理
            absenceArgument: {
              detail: "清楚。"
            },
            // 最后陈述
            statement: {
              detail: "",
            },
            // 最后陈述-缺席审理
            absenceStatement: {
              detail: "清楚。"
            },
            // 法庭调解
            conciliation: {
              status: "愿意",
              detail: "",
              standpoint: "清楚。",
            },
            // 法庭调解-缺席审理
            absenceConciliation: {
              detail: "清楚。"
            },
            // 法庭调解-不同意调解
            disagreeConciliation: {
              detail: "清楚。"
            },
            // 举证质证
            proof: {
              // 举证内容
              detail: "",
              // 质证意见
              sugestion: {
                toAccuser: "", // 对于原告举证的质证意见
                toAccused: "", // 对于被告举证的质证意见
                toThirdparty: "", // 对于第三人举证的质证意见
              },
              // 是否需要交叉询问或补充调查
              requirement: {
                status: "无",
                detail: "",
              },
            },
          }],
        }],
        // 第三人
        thirdparties: [{
          // 诉讼主体
          subjects: [{
            ordinal: "", // 序数
            name: "", // 名称
            info: "", // 信息
            isAppear: "到庭", // 是否出庭
            showFlag: true, //到庭显示，未到庭隐藏（针对所有诉讼参与人对应的列表）
            parentType: "第三人",
            type: "第三人",
            // 异议及理由
            objection: {
              status: "无异议",
              detail: "",
            },
            //异议及理由-缺席审理
            absenceObjection: {
              detail: "清楚。"
            },
            witness: {
              detail: "无",
            },
            // 告知诉讼权利
            rights: {
              detail: "收到，清楚。",
            },
            // 告知事项
            matter: {
              detail: "清楚。",
            },
            // 是否申请回避
            evasion: {
              status: "不申请",
              detail: "",
            },
            // 举证期限异议
            evidence: {
              status: "无异议",
              isAgree: "同意",
              detail: "",
            },
            // 诉辩意见
            opinion: {
              detail: "",
            },
            // 诉辩意见-缺席审理
            absenceOpinion: {
              detail: "清楚。"
            },
            // 无争议归纳
            undisputed: {
              isObjection: "无异议", // 是否有异议
              isSupply: "无补充", // 是否有补充
            },
            // 争议归纳
            disputed: {
              isObjection: "无异议", // 是否有异议
              isSupply: "无补充", // 是否有补充
            },
            // 法庭询问
            inquiry: [],
            // 法庭辩论
            argument: [{
              detail: "",
            }],
            //法庭辩论-缺席审理
            absenceArgument: {
              detail: "清楚。"
            },
            // 最后陈述
            statement: {
              detail: "",
            },
            // 最后陈述-缺席审理
            absenceStatement: {
              detail: "清楚。"
            },
            // 法庭调解
            conciliation: {
              status: "愿意",
              detail: "",
              standpoint: "清楚。",
            },
            // 法庭调解-缺席审理
            absenceConciliation: {
              detail: "清楚。"
            },
            // 法庭调解-不同意调解
            disagreeConciliation: {
              detail: "清楚。"
            },
            // 举证质证
            proof: {
              // 举证内容
              detail: "",
              // 质证意见
              sugestion: {
                toAccuser: "", // 对于原告举证的质证意见
                toAccused: "", // 对于被告举证的质证意见
                toThirdparty: "", // 对于第三人举证的质证意见
              },
              // 是否需要交叉询问或补充调查
              requirement: {
                status: "无",
                detail: "",
              },
            },
          }],
          // 责任人
          responsibles: [{
            role: "法定代表人", // 角色
            name: "", // 名称
            info: "", // 信息
            isAppear: "到庭", // 是否出庭
            showFlag: true, //到庭显示，未到庭隐藏（针对所有诉讼参与人对应的列表）
            parentType: "第三人",
            type: "第三人法定代表人",
            // 异议及理由
            objection: {
              status: "无异议",
              detail: "",
            },
            //异议及理由-缺席审理
            absenceObjection: {
              detail: "清楚。"
            },
            witness: {
              detail: "无",
            },
            // 告知诉讼权利
            rights: {
              detail: "收到，清楚。",
            },
            // 告知事项
            matter: {
              detail: "清楚。",
            },
            // 是否申请回避
            evasion: {
              status: "不申请",
              detail: "",
            },
            // 举证期限异议
            evidence: {
              status: "无异议",
              isAgree: "同意",
              detail: "",
            },
            // 诉辩意见
            opinion: {
              detail: "",
            },
            // 诉辩意见-缺席审理
            absenceOpinion: {
              detail: "清楚。"
            },
            // 无争议归纳
            undisputed: {
              isObjection: "无异议", // 是否有异议
              isSupply: "无补充", // 是否有补充
            },
            // 争议归纳
            disputed: {
              isObjection: "无异议", // 是否有异议
              isSupply: "无补充", // 是否有补充
            },
            // 法庭询问
            inquiry: [],
            // 法庭辩论
            argument: [{
              detail: "",
            }],
            //法庭辩论-缺席审理
            absenceArgument: {
              detail: "清楚。"
            },
            // 最后陈述
            statement: {
              detail: "",
            },
            // 最后陈述-缺席审理
            absenceStatement: {
              detail: "清楚。"
            },
            // 法庭调解
            conciliation: {
              status: "愿意",
              detail: "",
              standpoint: "清楚。",
            },
            // 法庭调解-缺席审理
            absenceConciliation: {
              detail: "清楚。"
            },
            // 法庭调解-不同意调解
            disagreeConciliation: {
              detail: "清楚。"
            },
            // 举证质证
            proof: {
              // 举证内容
              detail: "",
              // 质证意见
              sugestion: {
                toAccuser: "", // 对于原告举证的质证意见
                toAccused: "", // 对于被告举证的质证意见
                toThirdparty: "", // 对于第三人举证的质证意见
              },
              // 是否需要交叉询问或补充调查
              requirement: {
                status: "无",
                detail: "",
              },
            },
          }],
          // 代理人
          agents: [{
            name: "", // 名称
            info: "", // 信息
            isAppear: "到庭", // 是否出庭
            showFlag: true, //到庭显示，未到庭隐藏（针对所有诉讼参与人对应的列表）
            auth: "特别授权",
            parentType: "第三人",
            type: "第三人委托诉讼代理人",
            // 异议及理由
            objection: {
              status: "无异议",
              detail: "",
            },
            //异议及理由-缺席审理
            absenceObjection: {
              detail: "清楚。"
            },
            witness: {
              detail: "无",
            },
            // 告知诉讼权利
            rights: {
              detail: "收到，清楚。",
            },
            // 告知事项
            matter: {
              detail: "清楚。",
            },
            // 是否申请回避
            evasion: {
              status: "不申请",
              detail: "",
            },
            // 举证期限异议
            evidence: {
              status: "无异议",
              isAgree: "同意",
              detail: "",
            },
            // 诉辩意见
            opinion: {
              detail: "",
            },
            // 诉辩意见-缺席审理
            absenceOpinion: {
              detail: "清楚。"
            },
            // 无争议归纳
            undisputed: {
              isObjection: "无异议", // 是否有异议
              isSupply: "无补充", // 是否有补充
            },
            // 争议归纳
            disputed: {
              isObjection: "无异议", // 是否有异议
              isSupply: "无补充", // 是否有补充
            },
            // 法庭询问
            inquiry: [],
            // 法庭辩论
            argument: [{
              detail: "",
            }],
            //法庭辩论-缺席审理
            absenceArgument: {
              detail: "清楚。"
            },
            // 最后陈述
            statement: {
              detail: "",
            },
            // 最后陈述-缺席审理
            absenceStatement: {
              detail: "清楚。"
            },
            // 法庭调解
            conciliation: {
              status: "愿意",
              detail: "",
              standpoint: "清楚。",
            },
            // 法庭调解-缺席审理
            absenceConciliation: {
              detail: "清楚。"
            },
            // 法庭调解-不同意调解
            disagreeConciliation: {
              detail: "清楚。"
            },
            // 举证质证
            proof: {
              // 举证内容
              detail: "",
              // 质证意见
              sugestion: {
                toAccuser: "", // 对于原告举证的质证意见
                toAccused: "", // 对于被告举证的质证意见
                toThirdparty: "", // 对于第三人举证的质证意见
              },
              // 是否需要交叉询问或补充调查
              requirement: {
                status: "无",
                detail: "",
              },
            },
          }],
        }]
      },
      other: {
        attendanceFlag: true,
        defendantPartFlag: true,
        thirdPartFlag: true,
        thirdManFlag: true,
        absenseStatus: false,
        absentee: [], //缺席人员数据
        toCourtMan: [], //到庭人员数据
        absence: 0
      },
      // 异议及理由
      objection: "",
      // 证人是否出庭
      witness: {
        status:false,
        detail:[]
      },
    },
    // 庭审序言
    preface: {
      // 庭审组织
      organize: {
        status: "hide",
        program: "simple",
        detail: "因工作调动，审判员/审判长/代理审判员/人民陪审员/书记员由XXX更换为XXX。",
      },
      // 告知诉讼权利
      rights: "",
      // 告知事项
      matter: "",
      // 是否申请回避
      evasion: "",
      // 举证期限异议
      evidence: ""
    },
    // 法庭调查
    investigate: {
      // 诉辩意见
      opinion: "",
      // 争点归纳
      conclude: {
        // 无争议归纳
        undisputed: {
          status: "",
          detail: "",
          show: true
        },
        // 有争议归纳
        disputed: {
          status: "",
          detail: "",
          show: true
        }
      },
      // 法庭询问
      inquiry: {
        elementquerys: [],
        proof_affirm: "" //审议归纳已排序
      },
      // 举证质证
      proof: {
        detail: "当事人围绕诉讼请求提交了证据： 、 、 、等证据以及当事人当庭陈述等予以证实，本院予以确认并在卷佐证。"
      },
      // 争义事实认定
      fact: {
        detail: ""
      },
    },
    // 法庭辩论
    argument: {
      // 原告方辩论意见
      accuser: "",
      // 被告方辩论意见
      accused: "",
      // 第三人辩论意见
      thirdparty: "",
      // 庭审总结
      summary: {
        detail: ""
      },
      other: {
        debateArray: [],
        debateTimes: 1
      }
    },
    // 最后陈述
    statement: "",
    // 法庭调解
    conciliation: {
      toMediateMan: [],
      status: true
    },
    // 休庭宣读
    announce: "",
    // 其他
    other: ""
  };
};
