# Stage 1: Build the application
# Use a Java 24 JDK image with Maven
FROM eclipse-temurin:24-jdk-alpine AS builder

# Install Maven in the build stage.
RUN apk add --no-cache maven

# Set the working directory
WORKDIR /app

# Copy the pom.xml file first to download dependencies
COPY pom.xml .

# Copy the rest of the source code
COPY src ./src

# Explicitly copy the application.properties file
COPY src/main/resources/application.properties ./src/main/resources/

# Package the application
RUN mvn clean package -DskipTests

# Stage 2: Create the final, lightweight image
# We use a smaller JRE image that supports Java 24 to run the application
FROM eclipse-temurin:24-jre-alpine

# Set the working directory for the final image
WORKDIR /app

# Install bash, netcat, and dos2unix for the entrypoint script
# The `nc` command is part of the netcat-openbsd package.
RUN apk add --no-cache bash netcat-openbsd dos2unix

# Copy the JAR file from the 'builder' stage to the final image
COPY --from=builder /app/target/auth-service-0.0.1-SNAPSHOT.jar /app/auth-service.jar

# Expose the port
EXPOSE 8081

# THIS IS THE NEW, CRUCIAL LINE.
# This CMD provides the arguments to the entrypoint.sh script.
# It tells the script to wait for `kafka:29092` before running `java -jar auth-service.jar`.
CMD ["java", "-jar", "auth-service.jar", "--spring.kafka.bootstrap-servers=${SPRING_KAFKA_BOOTSTRAP_SERVERS}"]