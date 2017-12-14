[1mdiff --git a/sources/trial/article/preview/script.js b/sources/trial/article/preview/script.js[m
[1mindex 7fb98db..c51a6c1 100644[m
[1m--- a/sources/trial/article/preview/script.js[m
[1m+++ b/sources/trial/article/preview/script.js[m
[36m@@ -75,6 +75,12 @@[m [mexport default {[m
             message(vm, "warning", "温馨提示：庭审笔录导出失败！");[m
           }[m
         });[m
[31m-    }[m
[32m+[m[32m    },[m
[32m+[m[32m    print() {[m
[32m+[m[32m      const newWindow = window.open("", "_blank", "");[m
[32m+[m[32m      newWindow.document.body.innerHTML = "test";[m
[32m+[m[32m      newWindow.print();[m
[32m+[m[32m      newWindow.close();[m
[32m+[m[32m    },[m
   }[m
 };[m
[1mdiff --git a/sources/trial/article/preview/view.html b/sources/trial/article/preview/view.html[m
[1mindex d720c43..563a252 100644[m
[1m--- a/sources/trial/article/preview/view.html[m
[1m+++ b/sources/trial/article/preview/view.html[m
[36m@@ -13,7 +13,7 @@[m
         <el-button @click="toWord" size="mini" type="default">[m
           <i class="fa fa-file-word-o">&nbsp;导出</i>[m
         </el-button>[m
[31m-        <el-button size="mini" type="default">[m
[32m+[m[32m        <el-button @click="print" size="mini" type="default">[m
           <i class="fa fa-print">&nbsp;打印</i>[m
         </el-button>[m
         <el-button @click="back" size="mini" type="default">[m
