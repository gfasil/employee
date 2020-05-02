package com.fh.skilltracker.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
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
    @NotNull
    private String id;
    @NotNull
    private String firstName;
    @NotNull
    private String lastName;
    @OneToOne
    @Valid
    private Address address;
    @NotNull
    @Email
    private String contactEmail;
    @NotNull
    @Email
    private String companyEmail;
    @NotNull
    private String birthDate;
    @NotNull
    private String hiredDate;
    @NotNull
    @Enumerated(value = EnumType.STRING)
    @Column(length = 32, columnDefinition = "varchar(32) default 'TECHNICAL_CONSULTANT'")
    private ROLE role=ROLE.TECHNICAL_CONSULTANT;
    @OneToMany(cascade =  CascadeType.ALL)
    @JoinColumn(name = "employee_id")
    private List<Skill> skills;
    @OneToOne
    @Valid
    private Employee assignedTo;
    @NotNull
    private BusinessUnit businessUnit;

    public Employee(String id,String firstName, String lastName, Address address, String contactEmail,
                    String companyEmail, String birthDate, String hiredDate, ROLE role, BusinessUnit businessUnit) {
        this.firstName=firstName;
        this.lastName=lastName;
        this.address=address;
        this.birthDate=birthDate;
        this.businessUnit=businessUnit;
        this.role=role;
        this.companyEmail=companyEmail;
        this.contactEmail=contactEmail;
        this.hiredDate=hiredDate;
        this.id=id;
    }
}
