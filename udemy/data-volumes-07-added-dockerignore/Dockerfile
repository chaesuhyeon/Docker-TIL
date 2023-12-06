FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# 환경 변수 정의 
# ENV 다음에 PORT는 환경 변수의 이름을 지정한 것
# PORT 다음에 오는 80은 환경 변수의 디폴트 값을 지정한 것
ENV PORT 80

# 위에서 정의한 환경 변수 사용
# $를 붙여줘서 환경변수임을 알린다.
EXPOSE $PORT

# VOLUME [ "/app/node_modules" ]

CMD [ "npm", "start" ]

# 아래 명령어 처럼 --env 옵션(-e 로 생략 가능)을 통해 환경 변수를 지정해줄 수 있다.
# 환경 변수가 여러개일 경우 key=value 형태로 여러번 지정해주면 된다.
# docker run -d --rm -p 3000:8000 --env PORT=8000  --name feedback-app -v feedback:/app/feedback -v /app/node_modules -v /app/temp feedback-node:env
# docker run -d --rm -p 3000:8000 --e PORT=8000  --name feedback-app -v feedback:/app/feedback -v /app/node_modules -v /app/temp feedback-node:env
# docker run -d --rm -p 3000:8000 --e PORT=8000  -e KEY=VALUE --name feedback-app -v feedback:/app/feedback -v /app/node_modules -v /app/temp feedback-node:env

# 만약 환경 변수를 파일로 관리 한다면 (예: .env 파일)
# --env-file ㅇ옵션을 사용하면 된다.
# ./.env 는 .env 파일이 현재 디렉토리에 있다는 것을 의미한다.
# docker run -d --rm -p 3000:8000 --env-file ./.env  --name feedback-app -v feedback:/app/feedback -v /app/node_modules -v /app/temp feedback-node:env