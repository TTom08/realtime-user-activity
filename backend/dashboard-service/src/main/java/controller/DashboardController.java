package controller;

import dto.DashboardMetricsDto;
import dto.KafkaProducerDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import service.DashboardKafkaConsumerService;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardKafkaConsumerService dashboardService;


    public DashboardController(DashboardKafkaConsumerService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public ResponseEntity<List<KafkaProducerDto>> getDashboardData() {

        List<KafkaProducerDto> recentEvents = dashboardService.getRecentEvents();

        return ResponseEntity.ok(recentEvents);
    }
}