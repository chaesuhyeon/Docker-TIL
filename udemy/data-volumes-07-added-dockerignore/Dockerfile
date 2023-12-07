FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# 이 인수는 dockerfile에서만 사용가능하며 모든 명령어에서 사용할 수 있는 것도 아님
# CMD 명령어에서는 사용 불가(ARG는 컨테이너가 시작될 때 실행되는 런타임 명령이기 때문)
ARG DEFAULT_PORT=80

# 인수 사용
ENV PORT $DEFAULT_PORT

# 위에서 정의한 환경 변수 사용
# $를 붙여줘서 환경변수임을 알린다.
EXPOSE $PORT

# VOLUME [ "/app/node_modules" ]

CMD [ "npm", "start" ]

# 아래 명령어 처럼 --env 옵션(-e 로 생략 가능)을 통해 환경 변수를 지정해줄 수 있다.
# 환경 변수가 여러개일 경우 key=value 형태로 여러번 지정해주면 된다.
# docker run -d --rm -p 3000:8000 --env PORT=8000  --name feedback-app -v feedback:/app/feedback -v /app/node_modules -v /app/temp feedback-node:env
# docker run -d --rm -p 3000:8000 -e PORT=8000  --name feedback-app -v feedback:/app/feedback -v /app/node_modules -v /app/temp feedback-node:env
# docker run -d --rm -p 3000:8000 -e PORT=8000  -e KEY=VALUE --name feedback-app -v feedback:/app/feedback -v /app/node_modules -v /app/temp feedback-node:env

# 만약 환경 변수를 파일로 관리 한다면 (예: .env 파일)
# --env-file 옵션을 사용하면 된다.
# ./.env 는 .env 파일이 현재 디렉토리에 있다는 것을 의미한다.
# docker run -d --rm -p 3000:8000 --env-file ./.env  --name feedback-app -v feedback:/app/feedback -v /app/node_modules -v /app/temp feedback-node:env