# Sử dụng image JDK
FROM gradle:8.5-jdk17 AS build
# Copy project vào container
WORKDIR /app
COPY . .
# Build file jar
RUN gradle bootJar --no-daemon
# Run jar
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
