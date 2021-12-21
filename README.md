<h1 align="center">
  <img  src="https://i.imgur.com/7KqDZxA.png" >
</h1>
<p align="center">
  
  <img src="https://img.shields.io/github/v/release/navendu-pottekkat/awesome-readme?include_prereleases" >
  
  <img src="https://img.shields.io/github/last-commit/rayray1010/twitter-api-2020" >

  <img src="https://img.shields.io/badge/express-4.16.4-green.svg" >
  
  <img src="https://img.shields.io/badge/Database-MYSQL-yellowgreen.svg">
  
  <img src="https://img.shields.io/github/issues-pr-closed/rayray1010/twitter-api-2020">

  </p>

# Movie List
透過串接第三方 API 取的電影清單，並在本地建立資料庫儲存使用者資訊


## 目錄
- [Movie List](#movie-list)
  - [目錄](#目錄)
  - [功能介紹](#功能介紹)
  - [安裝流程](#安裝流程)


## 功能介紹
  * 提供使用者登入、登出及註冊帳號功能
  * 提供目前最受歡迎電影資訊資訊
  * 提供使用者查詢目前已上映電影資訊
  * 提供使用者把電影加入、移除我的最愛功能

## 安裝流程

* 流程： 
  * 利用終端機(Terminal)，Clone專案至目標位置
    ```
    git clone https://github.com/rayray1010/MovieList-DB
    ```

  * 進入專案資料夾後，安裝 npm packages
    ```
    npm install
    ```
    
    
  * 請在MySQL Workbench，建立SQL資料庫
    ```
    create database movies_project
    ```
    
  * 載入model
    ```
    npx sequelize db:migrate
    ```

  * 開啟伺服器
    ```
    npm run dev
    ```