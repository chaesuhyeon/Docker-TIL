FROM php:7.4-fpm-alpine

WORKDIR /var/www/html

RUN docker-php-ext-install pdo_mysql

# 도커 파일의 끝에 CMD 또는 ENTRYPOINT 명령어를 사용하지 않았다면 베이스 이미지의 CMD 또는 ENTRYPOINT 명령어가 실행된다. (베이스 이미지에 존재한다면)
# php 베이스 이미지에는 실행되는 디폴트 명령어가 있다