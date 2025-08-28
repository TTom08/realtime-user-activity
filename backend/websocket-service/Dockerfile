FROM eclipse-temurin:24-jdk-alpine AS builder

RUN apk add --no-cache maven

WORKDIR /app

COPY pom.xml .

COPY src ./src

COPY src/main/resources/application.properties ./src/main/resources/

RUN mvn clean package -DskipTests

FROM eclipse-temurin:24-jre-alpine

WORKDIR /app

COPY --from=builder /app/target/websocket-service-0.0.1-SNAPSHOT.jar /app/websocket-service.jar

EXPOSE 8083

CMD ["java", "-jar", "websocket-service.jar", "--spring.kafka.bootstrap-servers=${SPRING_KAFKA_BOOTSTRAP_SERVERS}"]
