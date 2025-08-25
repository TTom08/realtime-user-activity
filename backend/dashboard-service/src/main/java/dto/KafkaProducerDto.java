package dto;

import java.time.Instant;

public record KafkaProducerDto(Long userId, String activityType, Instant timestamp) {
}