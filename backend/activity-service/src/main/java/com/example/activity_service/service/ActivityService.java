package com.example.activity_service.service;

import com.example.activity_service.dto.UserActivityEvent;
import com.example.activity_service.model.ActivityType;
import com.example.activity_service.model.UserActivity;
import com.example.activity_service.repository.UserActivityRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ActivityService {

    private final UserActivityRepository userActivityRepository;

    public ActivityService(UserActivityRepository userActivityRepository) {
        this.userActivityRepository = userActivityRepository;
    }


    public void saveActivity(UserActivityEvent event) {
        UserActivity userActivity = new UserActivity();
        userActivity.setUserId(event.getUserId());
        userActivity.setActivityType(event.getActivityType());
        userActivity.setTimestamp(event.getTimestamp());
        userActivityRepository.save(userActivity);
    }

}
