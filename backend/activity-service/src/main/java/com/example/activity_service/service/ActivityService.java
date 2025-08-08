package com.example.activity_service.service;

import com.example.activity_service.dto.UserLoggedInEvent;
import com.example.activity_service.model.ActivityType;
import com.example.activity_service.model.UserActivity;
import com.example.activity_service.repository.UserActivityRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.time.LocalDateTime;

@Service  //This annotation indicates that this class is a service component in the Spring context.
// It is used to encapsulate business logic and interact with repositories or other services.
public class ActivityService {

    private final UserActivityRepository userActivityRepository;

    // Constructor injection for UserActivityRepository
    // This is a common practice in Spring to ensure that the service has access to the repository
    // without needing to create it manually. Spring will automatically inject the repository instance.
    public ActivityService(UserActivityRepository userActivityRepository) {
        this.userActivityRepository = userActivityRepository;
    }

    // Method to log user login activity
    // This method creates a new UserActivity instance representing a user login event
    // and saves it to the database using the UserActivityRepository.
    // It captures the user ID, activity type (LOGIN), and the current timestamp.
    public void logUserLogin(String userId) {
        UserActivity activity = new UserActivity(); // Create a new UserActivity instance
        activity.setUserId(Long.valueOf(userId));// Set the user ID from the string input
        activity.setActivityType(ActivityType.LOGIN);// Set the activity type to LOGIN
        activity.setTimestamp(LocalDateTime.now());// Set the current timestamp for the activity

        userActivityRepository.save(activity);// Save the activity to the database using the repository
    }

    // Method to retrieve all user activities
    // This method fetches all UserActivity records from the database using the UserActivityRepository.
    public List<UserActivity> getAllActivities() {
        return userActivityRepository.findAll();
    }

    // Method to retrieve user activities by user ID
    // This method takes a user ID as a string, converts it to a Long, and
    // retrieves all UserActivity records associated with that user ID from the database.
    public List<UserActivity> getActivitiesByUserId(String userId) {
        return userActivityRepository.findByUserId(Long.valueOf(userId));
    }

    //EN ADTAM HOZZA
    public void saveActivity(UserLoggedInEvent event) {
    }
}
