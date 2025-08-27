package service;

import dto.KafkaProducerDto;
import entity.UserActivity;
import entity.UserPresence;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import repository.UserActivityRepository;
import repository.UserPresenceRepository;

import java.util.Optional;

@Service
public class DashboardKafkaConsumerService {

    private final UserActivityRepository userActivityRepository;
    private final UserPresenceRepository userPresenceRepository;

    public DashboardKafkaConsumerService(UserActivityRepository userActivityRepository, UserPresenceRepository userPresenceRepository) {
        this.userActivityRepository = userActivityRepository;
        this.userPresenceRepository = userPresenceRepository;
    }

    @KafkaListener(topics = "user-activity-topic", groupId = "dashboard-service-group", containerFactory = "kafkaListenerContainerFactory")
    @Transactional
    public void kafkaListener(KafkaProducerDto dto) {
        try {
            Optional<UserPresence> existingPresence = userPresenceRepository.findByUserId(dto.userId());
            UserPresence presence = existingPresence.orElseGet(() -> {
                UserPresence newUserPresence = new UserPresence();
                newUserPresence.setUserId(dto.userId());
                return newUserPresence;
            });
            presence.setLastActive(dto.timestamp());
            userPresenceRepository.save(presence);

            UserActivity newActivity = new UserActivity();
            newActivity.setUserId(dto.userId());
            newActivity.setActivityType(dto.activityType());
            newActivity.setEventDate(dto.timestamp());
            userActivityRepository.save(newActivity);

            System.out.println("Processed event for user: " + dto.userId());
        } catch (Exception e) {
            System.err.println("Error processing event: " + e.getMessage());
        }
    }
}


