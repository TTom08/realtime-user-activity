package com.example.activity_service.service;

import com.example.activity_service.dto.UserLoggedInEvent;
import com.example.activity_service.model.ActivityType;
import com.example.activity_service.model.UserActivity;
import com.example.activity_service.repository.UserActivityRepository;
import org.springframework.stereotype.Service;

@Service
public class ActivityService {

    private final UserActivityRepository userActivityRepository;

    public ActivityService(UserActivityRepository userActivityRepository) {
        this.userActivityRepository = userActivityRepository;
    }

    public void saveActivity(UserLoggedInEvent event) {
        UserActivity userActivity = new UserActivity();
        userActivity.setUserId(Long.valueOf(event.getUserId()));
        userActivity.setActivityType(ActivityType.LOGIN);
        userActivity.setTimestamp(event.getTimestamp());
        userActivityRepository.save(userActivity);
    }
}