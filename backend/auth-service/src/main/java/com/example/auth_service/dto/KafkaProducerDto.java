package com.example.auth_service.dto;

import java.time.LocalDateTime;

public record KafkaProducerDto(Long userId, String activityType, LocalDateTime timestamp) {
}
