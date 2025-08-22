package com.example.websocket_service.dto;

import java.time.Instant;

public record RealtimeEventDto(Long userId, String activityType, Instant timestamp) {
}
