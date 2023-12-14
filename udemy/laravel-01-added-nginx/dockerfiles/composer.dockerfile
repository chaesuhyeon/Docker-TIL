FROM composer:latest

WORKDIR /var/www/html

# -ignore-platform-reqs : 일부 종속성이 누락되더라도 경고나 오류 없이 실행해주는 옵션
ENTRYPOINT [ "composer" , "--ignore-platform-reqs"]