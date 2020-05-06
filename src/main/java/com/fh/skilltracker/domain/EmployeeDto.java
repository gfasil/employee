package com.fh.skilltracker.domain;


import javax.persistence.CascadeType;
import javax.persistence.OneToOne;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.List;



public class EmployeeDto {

    private String id;

    private String firstName;
    @NotNull
    private String lastName;
    @OneToOne(cascade =  CascadeType.ALL)
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
    private String role;
    private List<Skill> skills;
    @OneToOne(cascade = CascadeType.REFRESH)
    @Valid
    private Employee assignedTo;
    @NotNull
    private BusinessUnit businessUnit;

    public EmployeeDto(String id, String firstName, @NotNull String lastName, @Valid Address address, @NotNull @Email String contactEmail, @NotNull @Email String companyEmail, @NotNull String birthDate, @NotNull String hiredDate, @NotNull String role, List<Skill> skills, @Valid Employee assignedTo, @NotNull BusinessUnit businessUnit) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.contactEmail = contactEmail;
        this.companyEmail = companyEmail;
        this.birthDate = birthDate;
        this.hiredDate = hiredDate;
        this.role = role;
        this.skills = skills;
        this.assignedTo = assignedTo;
        this.businessUnit = businessUnit;
    }
}
