package dto;

import java.time.Instant;

public record AuthActivityEventDto(Long userId, String activityType, Instant timestamp) {
}