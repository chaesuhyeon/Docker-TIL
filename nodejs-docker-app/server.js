// Express 모듈 불러오기
const express = require("express");

// Express 서버를 위한 포트 설정
const PORT = 8080;

// 새로운 Express 애플리케이션 생성
const app = express();

// '/'경로로 요청이 들어오면 "반갑습니다" 라는 결과 값을 전달
app.get("/", (req, res) => {
  res.send("변경된 안녕하세요");
});

// 해당 포트에서 애플리케이션 시작
app.listen(PORT, () => {
  console.log("애플리케이션이 실행됐습니다.");
});
