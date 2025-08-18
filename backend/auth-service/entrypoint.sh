#!/bin/bash
# entrypoint.sh: Waits for Kafka and then starts the application.
set -e

host="kafka"
port="29092"

>&2 echo "Waiting for Kafka to be ready at $host:$port..."

until nc -z "$host" "$port"; do
  >&2 echo "Kafka is unavailable - sleeping"
  sleep 1
done

>&2 echo "Kafka is ready, starting the application..."

# Now, we start the Java application
exec java -jar /app/auth-service.jar
