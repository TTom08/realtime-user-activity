package service;

import dto.DashboardMetricsDto;
import dto.KafkaProducerDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    private final DashboardKafkaConsumerService kafkaConsumerService;

    public DashboardService(DashboardKafkaConsumerService kafkaConsumerService) {
        this.kafkaConsumerService = kafkaConsumerService;
    }

    public DashboardMetricsDto getDashboardData() {
        List<KafkaProducerDto> recentActivities = kafkaConsumerService.getRecentEvents();

        return new DashboardMetricsDto(recentActivities);
    }
}