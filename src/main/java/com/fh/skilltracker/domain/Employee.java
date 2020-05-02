package com.fh.skilltracker.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.Valid;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(
            name = "uuid",
            strategy = "uuid"
    )
    @Column(columnDefinition = "CHAR(32)")
    private String id;
    private String firstName;
    private String lastName;

    @OneToOne
    @Valid
    private Address address;
    private String contactEmail;
    private String companyEmail;
    private String birthDate;
    private String hiredDate;
    private ROLE role;
    @OneToMany(cascade =  CascadeType.ALL)
    @JoinColumn(name = "employee_id")
    private List<Skill> skills;
    @OneToOne
    @Valid
    private Employee assignedTo;
    private BusinessUnit businessUnit;


}
