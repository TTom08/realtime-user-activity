package service;

import dto.DashboardSummaryDto;
import dto.KafkaProducerDto;
import entity.UserPresence;
import org.springframework.stereotype.Service;
import repository.UserPresenceRepository;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardService {

    private static final Duration ACTIVE_FOR = Duration.ofMinutes(5);

    private final UserPresenceRepository userPresenceRepository;

    public DashboardService(UserPresenceRepository userPresenceRepository) {
        this.userPresenceRepository = userPresenceRepository;
    }

    public DashboardSummaryDto getUserStatusSummary() {
        List<UserPresence> allUsers = userPresenceRepository.findAll();
        DashboardSummaryDto summary = new DashboardSummaryDto();
        long activeCount = 0;
        List<DashboardSummaryDto.InactiveUser> inactiveDetails = new ArrayList<>();

        for (UserPresence user : allUsers) {
            Duration timeSinceLastActive = Duration.between(user.getLastActive(), Instant.now());
            if (timeSinceLastActive.compareTo(ACTIVE_FOR) <= 0) {
                activeCount++;
            } else {
                DashboardSummaryDto.InactiveUser inactiveUser = new DashboardSummaryDto.InactiveUser();
                inactiveUser.setUserId(user.getUserId());
                inactiveUser.setActiveSince(formatDuration(timeSinceLastActive));
                inactiveDetails.add(inactiveUser);
            }
        }

        summary.setActiveUsers(activeCount);
        summary.setInactiveUsers((long) inactiveDetails.size());
        summary.setInactiveUserDetails(inactiveDetails);

        return summary;

    }

    private String formatDuration(Duration duration) {
        long minutes = duration.toMinutes();
        if (minutes < 60) {
            return minutes + " minutes ago";
        }
        long hours = duration.toHours();
        if (hours < 24) {
            return hours + " hours ago";
        }
        long days = duration.toDays();
        return days + " days ago";
    }

}