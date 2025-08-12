package com.example.auth_service.kafka;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {
    @Bean
    public NewTopic userActivityTopic() {
        return TopicBuilder.name("user-activity-topic")
                .partitions(1)
                .replicas(1)
                .build();
    }
}
