package service;

import dto.KafkaProducerDto;
import lombok.Getter;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Getter
@Service
public class DashboardKafkaConsumerService {

    private final List<KafkaProducerDto> recentEvents = new CopyOnWriteArrayList<>();

    @KafkaListener(topics = "user-activity-topic", groupId = "dashboard-service-group")
    public void listen(KafkaProducerDto event) {
        recentEvents.addFirst(event);
        if (recentEvents.size() > 100) {
            recentEvents.removeLast();
        }
    }

}


