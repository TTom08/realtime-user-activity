package com.example.activity_service.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {

    // The name of the Kafka topic for user activities
    public static final String USER_ACTIVITY_TOPIC = "user-activity-topic";

    @Bean
    // This method creates a new Kafka topic named "user-activity-topic"
    // with 1 partition and 1 replica.
    // The @Bean annotation indicates that this method produces a bean to be managed by the Spring
    public NewTopic userActivityTopic() {
        return TopicBuilder.name(USER_ACTIVITY_TOPIC)
                .partitions(1)
                .replicas(1)
                .build();
    }
}