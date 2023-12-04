FROM node:14

WORKDIR /app

# package.json을 작업 디렉토리로 복사
COPY package.json .

# package.json에 명시된 모든 종속성을 설치
RUN npm install

# 나머지 코드 복사
COPY . .

EXPOSE 80

CMD [ "node", "server.js" ]