package com.example.activity_service.service;

import com.example.activity_service.dto.UserLoggedInEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {
    //The KafkaConsumerService class listens for user login events from a Kafka topic
    // and processes them by saving the activity using the ActivityService.
    private final ActivityService activityService;

    // The constructor injects the ActivityService,
    public KafkaConsumerService(ActivityService activityService) {
        this.activityService = activityService;
    }

    // The consumeUserLoggedInEvent method listens for messages on the "user-activity-topic"
    // and processes UserLoggedInEvent messages.
    // When a UserLoggedInEvent is received, it prints the user ID to the console
    // and calls the saveActivity method of ActivityService to log the activity.
    @KafkaListener(topics = "user-activity-topic", groupId = "activity-service-group")
    public void consumeUserLoggedInEvent(UserLoggedInEvent event) {
        System.out.println("Received user logged in event from Kafka: " + event.getUserId());
        // The saveActivity method of ActivityService is called to log the activity.
        activityService.saveActivity(event);
    }
}
