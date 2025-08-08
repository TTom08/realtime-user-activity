package com.example.activity_service.repository;

import com.example.activity_service.model.UserActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
//The UserActivityRepository interface extends JpaRepository to provide CRUD (create,read,update,delete) operations for UserActivity entities.
// It includes a method to find UserActivity records by userId, which Spring Data JPA
// will automatically implement based on the method name.
// The @Repository annotation indicates that this interface is a Spring Data repository.
public interface UserActivityRepository extends JpaRepository<UserActivity, Long> {

    //The Spring Data JPA will automatically implement this method based on its name.
    // It retrieves a list of UserActivity records associated with the specified userId.
    List<UserActivity> findByUserId(Long userId);

}