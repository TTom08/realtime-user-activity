package controller;

import dto.DashboardSummaryDto;
import dto.KafkaProducerDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import service.DashboardService;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;


    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/status")
    public ResponseEntity<DashboardSummaryDto> getUserStatus() {

        DashboardSummaryDto status = dashboardService.getUserStatusSummary();

        return ResponseEntity.ok(status);
    }
}