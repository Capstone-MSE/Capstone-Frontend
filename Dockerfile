# Node.js 이미지를 기반으로 빌드 환경 설정
FROM node:latest as build

# 작업 디렉토리 설정
WORKDIR /app

# package.json을 복사하여 의존성 설치 진행
COPY package.json ./

# 의존성 설치
RUN npm install

# 소스 코드를 복사
COPY . ./

# 리액트 애플리케이션 빌드
RUN npm run build

# Nginx 이미지를 기반으로 런타임 환경 설정
FROM nginx:latest

# Nginx 설정 파일을 덮어씌우기 위해 기존의 default.conf 파일을 삭제
RUN rm /etc/nginx/conf.d/default.conf

# 빌드된 리액트 애플리케이션을 Nginx가 제공하는 정적 파일 경로로 복사
COPY --from=build /app/build /usr/share/nginx/html

# 80 포트 열기
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
