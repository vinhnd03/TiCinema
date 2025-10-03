# Stage 1: Build JAR bằng Gradle
FROM gradle:8.5-jdk17 AS builder

# Tạo thư mục làm việc
WORKDIR /app

# Copy toàn bộ code backend vào container
COPY . .

# Build project, bỏ qua test cho nhanh
RUN gradle build -x test

# Stage 2: Runtime - chỉ copy file JAR đã build
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy JAR từ stage 1
COPY --from=builder /app/build/libs/*.jar app.jar

# Expose port 8080
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
