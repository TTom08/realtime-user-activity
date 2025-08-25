package dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardMetricsDto {
    private Long totalUsers;
    private Long activeUsers;
    private Long totalTransactions;
    private Double totalRevenue;


}
