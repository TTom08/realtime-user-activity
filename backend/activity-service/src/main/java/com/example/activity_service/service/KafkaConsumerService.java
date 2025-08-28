package com.example.activity_service.service;

import com.example.activity_service.dto.UserActivityEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {
    private final ActivityService activityService;

    public KafkaConsumerService(ActivityService activityService) {
        this.activityService = activityService;
    }

    @KafkaListener(topics = "user-activity-topic", groupId = "activity-service-group")
    public void consumeUserLoggedInEvent(UserActivityEvent event) {
        System.out.println("Received user logged in event from Kafka: " + event.getUserId());
        activityService.saveActivity(event);
    }
}
