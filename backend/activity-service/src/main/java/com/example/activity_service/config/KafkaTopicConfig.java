package com.example.activity_service.config;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {

    public static final String USER_ACTIVITY_TOPIC = "user-activity-topic";

    @Bean
    public NewTopic userActivityTopic() {
        return TopicBuilder.name(USER_ACTIVITY_TOPIC)
                .partitions(1)
                .replicas(1)
                .build();
    }
}