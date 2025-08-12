# Start from a base image with Java installed
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the built JAR file from your target/ directory
# This assumes you have already run 'mvn package' to create the JAR
COPY target/auth-service-0.0.1-SNAPSHOT.jar /app/auth-service.jar

# Expose the port the application listens on
EXPOSE 8082

# The command to run the application
CMD ["java", "-jar", "activity-service.jar"]