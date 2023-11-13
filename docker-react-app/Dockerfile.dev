# 생성할 이미지의 베이스 이미지 지정
FROM node:18

# 작업 디렉토리 지정
WORKDIR /usr/src/app

# 변경되지 않은 종속성까지 다시 내려받는 문제를 해결하기 위해 package.json 먼저 복사
COPY package.json ./

# package.json에 명시된 종속성들을 내려받음
RUN npm install

# 나머지 파일들도 복사
COPY ./ ./

# 컨테이너가 시작되면 실행할 명령어 작성
CMD ["npm", "run", "start"]


#  docker run -p 3000:3000 -v /usr/src/app/node_modules -v ${pwd}:/usr/src/app -t ddd8177/docker-react-app