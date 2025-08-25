# Stage 1: Build the application
# Use a Java 24 JDK image and install Maven on top of it.
FROM eclipse-temurin:24-jdk-alpine AS builder

# Install Maven in the build stage. This is a more reliable approach
# than relying on a specific combination image tag that may not exist.
RUN apk add --no-cache maven

# Set the working directory inside this stage
WORKDIR /app

# Copy the pom.xml file first to download dependencies
COPY pom.xml .

# Copy the rest of the source code
COPY src ./src

# Explicitly copy the application.properties file to ensure it's
# included in the build and is picked up correctly.
COPY src/main/resources/application.properties ./src/main/resources/

# Use Maven to clean and package the application
# The "-DskipTests" flag is added to skip running the tests during the build.
RUN mvn clean package -DskipTests

# Stage 2: Create the final, lightweight image
# We use a smaller JRE image that supports Java 24 to run the application
FROM eclipse-temurin:24-jre-alpine

# Set the working directory for the final image
WORKDIR /app

# Copy the JAR file from the 'builder' stage to the final image
COPY --from=builder /app/target/activity-service-0.0.1-SNAPSHOT.jar /app/activity-service.jar

# Expose the port
EXPOSE 8082

# The command to run the application
CMD ["java", "-jar", "activity-service.jar", "--spring.kafka.bootstrap-servers=${SPRING_KAFKA_BOOTSTRAP_SERVERS}"]
