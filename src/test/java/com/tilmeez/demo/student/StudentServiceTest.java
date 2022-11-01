package com.tilmeez.demo.student;

import com.tilmeez.demo.student.exception.BadRequestException;
import com.tilmeez.demo.student.exception.StudentNotFoundException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class StudentServiceTest {
    @Mock private StudentRepository studentRepository;
    private StudentService underTest;

    @BeforeEach
    void setUp() {
        underTest = new StudentService(studentRepository);
    }

    @Test
    void canGetAllStudent() {
        // when
        underTest.getAllStudent();

        // then
        verify(studentRepository).findAll();
    }

    @Test
    void CanAddStudent() {
        // give

        String email = "meeral@gmail.com";
        Student student = new Student(
                "Meeral",
                email,
                Gender.FEMALE
        );

        // when
        underTest.addStudent(student);

        // then
        ArgumentCaptor<Student> studentArgumentCaptor =
                ArgumentCaptor.forClass(Student.class);

        verify(studentRepository)
                .save(studentArgumentCaptor.capture());

        Student capturedStudent = studentArgumentCaptor.getValue();
        assertThat(capturedStudent).isEqualTo(student);
    }

    @Test
    void willThrowWhenEmailIsTaken() {
        // give

        String email = "meeral@gmail.com";
        Student student = new Student(
                "Meeral",
                email,
                Gender.FEMALE
        );

        given(studentRepository.selectExistsEmail(student.getEmail()))
                .willReturn(true);

        // when
        // then

        assertThatThrownBy(() -> underTest.addStudent(student))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("Email " + student.getEmail() + " is taken");

        verify(studentRepository, never()).save(any());

    }

    @Test
    void CanDeleteStudent() {
        // give

        long id = 10;
        given(studentRepository.existsById(id))
                .willReturn(true);

        // when
        underTest.deleteStudent(id);

        //then
        verify(studentRepository).deleteById(id);

    }

    @Test
    void willThrowWhenDeleteStudentNotFound() {
        // give

        long id = 10;
        given(studentRepository.existsById(id))
                .willReturn(false);

        // when
        //then
        assertThatThrownBy(() -> underTest.deleteStudent(id))
                .isInstanceOf(StudentNotFoundException.class)
                .hasMessageContaining("Student with id: " + id + " does not exists");

        verify(studentRepository, never()).deleteById(any());


    }
}