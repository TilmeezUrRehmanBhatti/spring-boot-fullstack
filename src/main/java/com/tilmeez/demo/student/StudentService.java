package com.tilmeez.demo.student;

import com.tilmeez.demo.student.exception.BadRequestException;
import com.tilmeez.demo.student.exception.StudentNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public List<Student> getAllStudent() {
        return studentRepository.findAll();
    }

    public void addStudent(Student student) {
        // check if email is taken
        Boolean existsEmail = studentRepository
                .selectExistsEmail(student.getEmail());
        if (existsEmail) {
            throw new BadRequestException(
                        "Email " + student.getEmail() + " is taken");
        }
        studentRepository.save(student);
    }

    public void deleteStudent(Long studentId) {
        // check if student exists
        if (!studentRepository.existsById(studentId)) {
            throw new StudentNotFoundException(
                    "Student with id: " + studentId + " does not exists"
            );
        }
        studentRepository.deleteById(studentId);
    }
}
