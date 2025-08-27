package entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.Instant;

@Entity
@Data
public class UserActivity {
    @Id
    @GeneratedValue
    private Long id;
    private Long userId;
    private String activityType;
    private Instant eventDate;
}
