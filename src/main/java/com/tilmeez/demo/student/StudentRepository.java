package com.tilmeez.demo.student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository //Not required due to JpaRepository
public interface StudentRepository
        extends JpaRepository<Student, Long> {

}
