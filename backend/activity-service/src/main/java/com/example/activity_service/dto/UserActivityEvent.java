package com.example.activity_service.dto;

import com.example.activity_service.model.ActivityType;
import lombok.Data;

import java.time.Instant;

@Data
public class UserActivityEvent {
    private Long userId;
    private ActivityType activityType;
    private Instant timestamp;
}
