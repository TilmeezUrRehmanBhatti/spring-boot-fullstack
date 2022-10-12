package com.tilmeez.demo.student;

import lombok.*;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
//@Data // it's final
public class Student {

    private Long id;
    private String name;
    private String email;
    private Gender gender;
}
