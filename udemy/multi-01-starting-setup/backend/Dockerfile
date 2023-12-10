FROM node

WORKDIR /app

# COPY package.json /app
# .라고 해도 ./app로 복사됨
COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

ENV MONGODB_USERNAME=root
ENV MONGODB_PASSWORD=secret

# CMD ["node", "app.js"]
# nodemon으로 실행 -> 소스코드가 변화할 떄마다 서버 재실행
CMD ["npm", "start"]