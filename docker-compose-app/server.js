// Express 모듈 불러오기
const express = require("express");

// redis 모듈 불러오기
const redis = require("redis");

// redis 쿨라이언트 생성
const client = redis.createClient({
  host: "redis-server",
  port: 6379,
});

// Express 서버를 위한 포트 설정
const PORT = 8080;

// 새로운 Express 애플리케이션 생성
const app = express();

// 숫자는 0부터 시작
client.set("number", 0);

// 현재 숫자를 가져온 후에 1씩 증가시킴
app.get("/", (req, res) => {
  client.get("number", (err, number) => {
    res.send("숫자가 1씩 올라갑니다. 숫자: " + number);
    client.set("number", parseInt(number) + 1);
  });
});

// 해당 포트에서 애플리케이션 시작
app.listen(PORT, () => {
  console.log("애플리케이션이 실행됐습니다.");
});
