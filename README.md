Restaurant list
--
A few restaurants here and you can look for some information

Function 
--
* Can get details of restaurant by cklicking it
* Can search restaurant by entering keyword in search bar
* can sort for choice method


Development tool 
--
* VScode
* Node.js (18.16.0)
* Express (4.17.1)
* Express-handlebars (4.0.2)
* express-session (1.17.1)
* method-override (3.0.0)
* mongoose (5.9.7)
* passport (0.4.1)
    * passport-facebook (3.0.0)
    * passport-local (1.0.0)

# 美食搜尋網站專案

## 專案畫面
主畫面
![image](/%E8%8F%9C%E5%96%AE%E9%A6%96%E9%A0%81.png)
登入頁
![image][(/%E7%99%BB%E5%85%A5.png)]
註冊頁
![image](/%E8%A8%BB%E5%86%8A.png)

## Features - 產品功能

現階段功能如下：
    1.使用者可以在首頁查看所有餐廳的簡易資料
    2.使用者可以點擊有興趣的餐廳，並獲得更詳細的資訊
    3.使用者可以透過搜尋餐廳名稱、分類來找到特定的餐廳
    4.使用者可以新增一家餐廳
    5.使用者可以修改一家餐廳的資訊
    6.使用者可以刪除一家餐廳
    7.使用者可以註冊帳號或用臉書帳號登入
    8.密碼經過bcrypt加密

## Environment SetUp - 環境建置

1. [Node.js](https://nodejs.org/en/)

## Installing - 專案安裝流程

1. 打開你的 terminal，Clone 此專案至本機電腦

```
git clone  https://github.com/crowtorakawa/restaurants.git
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
cd restaurantList
```

3. 安裝 npm 套件

```
npm install 
```

4. 安裝 nodemon 套件，terminal輸入
```
npm install -g nodemon
```

5. 啟動伺服器，執行 app.js 檔案

```
nodemon app.js
```

6. 參考 .env.example，建立 .env檔案
7. 匯入種子資料，terminal輸入
```
npm run seed
```
8. 執行檔案，terminal輸入
```
npm run dev
```
當 terminal 出現以下字樣，表示伺服器已啟動並成功連結
mongodb connected!
Express is listening on http://localhost:3000

9. 登入可用下列預設帳密
```
email: user1@example.com
password: 12345678
email: user2@example.com
password: 12345678
```

