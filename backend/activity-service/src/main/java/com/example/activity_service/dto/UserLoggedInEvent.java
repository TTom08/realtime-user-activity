package com.example.activity_service.dto;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * UserLoggedInEvent represents an event that is triggered when a user logs in.
 * It contains the user ID and the timestamp of the login event.
 */
@Data
public class UserLoggedInEvent {
    private String userId;
    private LocalDateTime timestamp;


    //EN ADTAM HOZZA
    public String getUserId() {
        return userId;
    }
}