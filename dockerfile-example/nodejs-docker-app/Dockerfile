FROM node:18

# 애플리케이션 디렉토리 생성
WORKDIR /usr/src/app

# 현재 폴더의 모든 파일들을 컨테이너 안으로 복사
COPY ./ ./

RUN npm install

EXPOSE 8080

CMD ["node", "server.js"]