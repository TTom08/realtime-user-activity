package com.example.activity_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * UserActivity represents an activity performed by a user in the system.
 * It contains the user ID, the type of activity, and the timestamp of when the activity occurred.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user_activity")
public class UserActivity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    @Enumerated(EnumType.STRING)
    private ActivityType activityType;

    private LocalDateTime timestamp;
}