export default () => {
  return {
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
        number: "",
        times: ""
      },
      code: "", // 案号
      reason: "", // 案由
      isPublic: "公开", // 是否公开审理
      audience: "", // 旁听人数
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
          // 序数
          ordinal: 1,
          // 诉讼主体
          subjects: [{
            ordinal: "", // 序数
            name: "", // 名称
            info: "", // 信息
            isAppear: "到庭", // 是否出庭
            // 异议及理由
            objection: {
              status: "无异议",
              detail: "",
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
              detail: "详见民事诉讼状。",
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
            // 最后陈述
            statement: {
              detail: "",
            },
            // 法庭调解
            conciliation: {
              status: "",
              detail: "",
              standpoint: "清楚",
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
            // 异议及理由
            objection: {
              status: "无异议",
              detail: "",
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
              detail: "详见民事诉讼状。",
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
            // 最后陈述
            statement: {
              detail: "",
            },
            // 法庭调解
            conciliation: {
              status: "",
              detail: "",
              standpoint: "清楚",
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
            auth: "特别授权",
            // 异议及理由
            objection: {
              status: "无异议",
              detail: "",
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
              detail: "详见民事诉讼状。",
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
            // 最后陈述
            statement: {
              detail: "",
            },
            // 法庭调解
            conciliation: {
              status: "",
              detail: "",
              standpoint: "清楚",
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
          // 序数
          ordinal: 1,
          // 诉讼主体
          subjects: [{
            ordinal: "", // 序数
            name: "", // 名称
            info: "", // 信息
            isAppear: "到庭", // 是否出庭
            // 异议及理由
            objection: {
              status: "无异议",
              detail: "",
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
            // 最后陈述
            statement: {
              detail: "",
            },
            // 法庭调解
            conciliation: {
              status: "",
              detail: "",
              standpoint: "清楚",
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
            // 异议及理由
            objection: {
              status: "无异议",
              detail: "",
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
            // 最后陈述
            statement: {
              detail: "",
            },
            // 法庭调解
            conciliation: {
              status: "",
              detail: "",
              standpoint: "清楚",
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
            auth: "特别授权",
            // 异议及理由
            objection: {
              status: "无异议",
              detail: "",
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
            // 最后陈述
            statement: {
              detail: "",
            },
            // 法庭调解
            conciliation: {
              status: "",
              detail: "",
              standpoint: "清楚",
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
          // 序数
          ordinal: 1,
          // 诉讼主体
          subjects: [{
            ordinal: "", // 序数
            name: "", // 名称
            info: "", // 信息
            isAppear: "到庭", // 是否出庭
            // 异议及理由
            objection: {
              status: "无异议",
              detail: "",
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
            // 最后陈述
            statement: {
              detail: "",
            },
            // 法庭调解
            conciliation: {
              status: "",
              detail: "",
              standpoint: "清楚",
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
            // 异议及理由
            objection: {
              status: "无异议",
              detail: "",
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
            // 最后陈述
            statement: {
              detail: "",
            },
            // 法庭调解
            conciliation: {
              status: "",
              detail: "",
              standpoint: "清楚",
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
            auth: "特别授权",
            // 异议及理由
            objection: {
              status: "无异议",
              detail: "",
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
            // 最后陈述
            statement: {
              detail: "",
            },
            // 法庭调解
            conciliation: {
              status: "",
              detail: "",
              standpoint: "清楚",
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
      },
      // 异议及理由
      objection: "",
      // 证人是否出庭
      witness: "",
    },
    // 庭审序言
    preface: {
      // 庭审组织
      organize: {
        status: "hide",
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
        },
        // 有争议归纳
        disputed: {
          status: "",
          detail: ""
        }
      },
      // 法庭询问
      inquiry: {
        elementquerys: [],
        proof_affirm:"" //审议归纳已排序
      },
      // 举证质证
      proof: "",
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
    conciliation: "",
    // 休庭宣读
    announce: "",
    // 其他
    other: ""
  };
};
