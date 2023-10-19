FROM node:18

# 애플리케이션 디렉토리 생성
WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

# 현재 폴더의 모든 파일들을 컨테이너 안으로 복사
COPY ./ ./

EXPOSE 8080

CMD ["node", "server.js"]