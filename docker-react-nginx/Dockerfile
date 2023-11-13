# as는 현재 FROM 부터 다음 FROM 전까지는 모두 builder 단계 라는 것을 명시한다.
FROM node:alpine as builder

# builder 단계에서 생성도니 파일과 폴더들은 컨테이너에 있는 /usr/src/app/build 디렉터리로 들어간다.
WORKDIR '/usr/src/app'

COPY package.json .

RUN npm install

COPY ./ ./

RUN npm run build

# nginx 이미지 가져옴
FROM nginx

# 다른 스테이지에 있는 파일을 복사하기 위해 --from=builder 와 같이 스테이지를 명시, 즉 builder 단계에서 빌드된 파일을 가져오는 것임을 명시
# 그리고 이 빌드 파일을 컨테이너의 /usr/share/nginx/html 디텍터리로 복사한다. 이 경로는 엔진엑스가 정적 파일을 브라우저에 제공할 수 있게 기본적으로 설정된 장소
COPY --from=builder /usr/src/app/build /usr/share/nginx/html