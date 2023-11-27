# 기본 이미지로 OpenJDK 11을 사용
FROM openjdk:11-jre-slim
WORKDIR /app
COPY .env /app/.env
# JAR 파일을 컨테이너에 복사
COPY build/libs/server-0.0.1-SNAPSHOT.jar /app/server-0.0.1-SNAPSHOT.jar
# 외부와 통신할 포트 지정
EXPOSE 8080
EXPOSE 18080
# 컨테이너가 시작될 때 실행할 명령 지정
CMD ["java", "-jar", "/app/server-0.0.1-SNAPSHOT.jar"]