## 交作業流程

1. 先在自身電腦創建專屬資料夾位置（自身習慣優先環境建置）
2. 到導師提供的 [GitHub Classroom 邀請連結](https://classroom.github.com/a/V4hZopA2)申請權限
3. 在 CLI 下指令：`git clone *GitHub 所提供的 clone 連結*`
4. 進入 mentor-program-3rd-zihur 專案資料夾：`cd mentor-program-3rd-zihur`
5. 執行一次以下指令，安裝基本環境 `npm install`
6. 建立一個branch：`git branch Week1`
7. 移動至 Week1 branch：`git checkout Week1`
8. 移動至第一周作業資料夾：`cd homework/week1`
9. 開啟相對應的作業檔案：`start hw1.md` or `vim hw1.md`
10. 完成作業後，執行 commit 指令並輸入註解：`git commit -am "add week1-hw1"`
11. push 至 GitHub 專案：`git push origin week1`
12. 至 GitHub 執行 PR
13. 至繳交作業專用的 [Repository](https://github.com/Lidemy/homeworks-3rd) 建立一個新的 issue，並在裡面輸入剛剛 PR 的網址