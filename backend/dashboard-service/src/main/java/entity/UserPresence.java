package entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.Instant;

@Entity
@Data
public class UserPresence {
    @Id
    private Long userId;
    private String currentPage;
    private Instant lastActive;
}
