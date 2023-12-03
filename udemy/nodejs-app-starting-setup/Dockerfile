FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

# dockerfile과 동일한 경로에 있는 파일과 폴더들을 컨테이너 안  /app 경로에 복사
# COPY . ./  --> workdir이 /app이기 때문에 ./만 써도 됨
COPY . /app

# 특정 포트를 도커에게 알려줌(아무런 기능 없고 그냥 document개념으로만 존재. 실질적으로 docker run 할 때 -p 옵션으로 포틀르 지정해줘야한다.)
# docker run -p 3000:80  c01 --> 3000포트로 들어오면 80포트로 연결 
EXPOSE 80

# CMD 명령어는 컨테이너가 시작되었을 때 실행되는 명령어(이미지가 생성될 때 실행x)
CMD ["node", "server.js"]
