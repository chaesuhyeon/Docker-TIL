FROM node:14

WORKDIR /app

# package.json을 작업 디렉토리로 복사
COPY package.json .

# package.json에 명시된 모든 종속성을 설치
RUN npm install

# 나머지 코드 복사
COPY . .

EXPOSE 80

# 여기서 그냥 볼륨만 지정하면 이름을 지정하지 않았기 때문에 '익명' 볼륨이 생성되고, 볼륨을 여기서 생성했음에도 불구하고 컨테이너를 중지/삭제 시키면 볼륨이 사라진다.
# 볼륨을 아래 명령어처럼 -v 옵션을 주고 지정을 하게되면 docker volume ls 명령어로 볼륨이 생성된 것을 확인할 수 있으며 컨테이너를 삭제하고 다시 새로운 컨테이너를 만들어도 이 볼륨과 연결된다.
# docker run -d -p 3000:80 --rm --name feedback-app -v feedback:/app/feedback feedback-node:volumes 
# VOLUME [ "/app/feedback" ]

CMD [ "npm", "start" ]