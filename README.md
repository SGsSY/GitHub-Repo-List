# GitHub-Repo-List

- 自動偵測輸入筐文字變動查詢 GitHub Repository
- 滾到最底時會自動載入更多資料

### 架構說明

- 使用 vite 快速建立 React + TypeScript 專案
- App.tsx 作為負責共用的項目，如：isLoading、isError，以及業務邏輯 queryText 變動後的查詢、要查 GitHub Repository 等
- components 內放非業務邏輯相關的元件，QueryInput、InfiniteScrollList、ListItem
- 因為 Infinite Scroll 目前只有在這個元件使用到，所以沒特別拉出來獨立成 custom hook
- 因為 api 的呼叫只有 search GitHub Repository，所以就在 src 下建立 service.ts 放相關的 api 內容，在大型專案內應該會有專門的資料夾、檔案分類來擺放
- 因為對樣式沒要求，所以只有做很簡單的排版，將內容統一放在 index.css
- 在 _＿test＿_ 資料夾撰寫元件的單元測試，主要測試是否正常渲染
