# Eagle

![](sources/assets/favicon.ico)

## Domain Object

```js
// 庭审笔录
export default () => {
  return {
    // 法院名称
    name: "成都市武侯区人民法院",
    // 笔录标题
    title: "民事案件审判笔录",
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
          // 诉讼主体
          ordinal: 1, // 序数
          subjects: [{
            ordinal: 1, // 序数
            name: "", // 名称
            info: "", // 信息
            isAppear: "到庭", // 是否出庭
          }],
          // 责任人
          responsibles: [{
            role: "法定代表人", // 角色
            name: "", // 名称
            info: "", // 信息
            isAppear: "到庭", // 是否出庭
          }],
          // 代理人
          agents: [{
            name: "", // 名称
            info: "", // 信息
            isAppear: "到庭", // 是否出庭
            auth: "特别授权",
          }],
        }],
        // 被告
        accuseds: [{
          // 诉讼主体
          subjects: [{
            name: "", // 名称
            info: "", // 信息
            isAppear: "到庭", // 是否出庭
          }],
          // 责任人
          responsibles: [{
            role: "法定代表人", // 角色
            name: "", // 名称
            info: "", // 信息
            isAppear: "到庭", // 是否出庭
          }],
          // 代理人
          agents: [{
            name: "", // 名称
            info: "", // 信息
            isAppear: "到庭", // 是否出庭
            auth: "特别授权",
          }],
        }],
        // 第三人
        thirdparties: [{
          // 诉讼主体
          subjects: [{
            name: "", // 名称
            info: "", // 信息
            isAppear: "到庭", // 是否出庭
          }],
          // 责任人
          responsibles: [{
            role: "法定代表人", // 角色
            name: "", // 名称
            info: "", // 信息
            isAppear: "到庭", // 是否出庭
          }],
          // 代理人
          agents: [{
            name: "", // 名称
            info: "", // 信息
            isAppear: "到庭", // 是否出庭
            auth: "特别授权",
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
      organize: "",
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
      // 法庭询问
      inquiry: "",
      // 举证质证
      proof: "",
      // 争点归纳
      conclude: {
        // 无争议归纳
        undisputed: "",
        // 有争议归纳
        disputed: ""
      }
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
      summary: "",
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
```

```javascript
// 庭审笔录
export default () => {
  return {
    judge: {

    }
  }
}
```

## Installation and deployment
1. git clone http://192.168.13.21/zhengh/eagle.git
2. cd flamingo
3. npm i
4. gulp
5. Open browser http://localhost:5005/dev/index.html

## Thirdparty Library
* [Vue 2.5.x](https://vuejs.org/)
* [Webpack 2.8.x](https://webpack.js.org/)
* [NodeJS 6.11.x](https://nodejs.org/)
* [Element-UI 2.0.x](element.eleme.io/)

## Transfer Protocol

> head
* status: (Integer)，Server-side status
  1. 200：Http response success.
  2. 201：Warning infomation.
  3. 202：Login timeout.
  4. 400: Bad request.
  5. 404: No page found.
  6. 405: Request method is not support.
  7. 415: Unsupported media type.
  8. 500：Server-side exceptions.
* token: (String)，Encryption key。
* message: (String)，Server-side infomation for current http request.
* total: (Integer)，Sum of business logic result (if the results as the object then total equals 1, as an array equals length of the array).

> body
* (Object/Array)，Realistic & available datas.

```javascript
  {
    head: {
      status: 200,
      token: "ghco9xdnaco31gmafukxchph",
      message: "Login Success!",
      total: 1
    },
    body: {
      username: "admin",
      password: "admin"
    }
  }
```

## Project Release

1. Update penguin/sources/partials/common/http.js

> Update base url for global ajax connection

2. gulp clean

> remove all of thing within the build & release folder

3. gulp build

> compile source code

4. gulp release --tar/zip

> compress build folder to the release
