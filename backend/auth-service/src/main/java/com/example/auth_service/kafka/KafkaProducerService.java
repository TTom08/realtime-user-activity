package com.example.auth_service.kafka;

import com.example.auth_service.dto.KafkaProducerDto;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {
    private final KafkaTemplate<String, KafkaProducerDto> kafkaTemplate;
    private final String TOPIC = "user-activity-topic";

    public KafkaProducerService(KafkaTemplate<String, KafkaProducerDto> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendMessage(KafkaProducerDto event) {
        kafkaTemplate.send(TOPIC, event.userId().toString(), event);
    }
}
