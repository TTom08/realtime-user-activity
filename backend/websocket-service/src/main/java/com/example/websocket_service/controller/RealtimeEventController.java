package com.example.websocket_service.controller;

import com.example.websocket_service.dto.RealtimeEventDto;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class RealtimeEventController {
    private final SimpMessagingTemplate messagingTemplate;

    public RealtimeEventController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @KafkaListener(topics = "user-activity-topic", groupId = "websocket-service-group", containerFactory = "kafkaListenerContainerFactory")
    public void handleUserEvents(RealtimeEventDto event) {
        System.out.println("Received user event from Kafka: " + event.activityType());

        messagingTemplate.convertAndSend("/topic/user-activity", event);
    }
}
