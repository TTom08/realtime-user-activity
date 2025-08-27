package dto;


import entity.UserActivity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardSummaryDto {
    private Long activeUsers;
    private Long inactiveUsers;
    private Long totalActivities;
    private List<UserActivity> recentActivities;

    @Data
    public static class InactiveUser {
        private Long userId;
        private String activeSince;
    }

    private List<InactiveUser> inactiveUserDetails;
}
