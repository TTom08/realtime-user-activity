FROM eclipse-temurin:24-jdk-alpine AS builder

RUN apk add --no-cache maven

WORKDIR /app

COPY pom.xml .

COPY src ./src

COPY src/main/resources/application.properties ./src/main/resources/

RUN mvn clean package -DskipTests

FROM eclipse-temurin:24-jre-alpine

WORKDIR /app

COPY --from=builder /app/target/activity-service-0.0.1-SNAPSHOT.jar /app/activity-service.jar

EXPOSE 8082

CMD ["java", "-jar", "activity-service.jar", "--spring.kafka.bootstrap-servers=${SPRING_KAFKA_BOOTSTRAP_SERVERS}"]
