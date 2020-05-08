package com.fh.skilltracker.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"},
        allowGetters = true)
public class Employee {
    // generate id using UUID and save it as a string
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(
            name = "uuid",
            strategy = "uuid"
    )
    @Column(columnDefinition = "CHAR(32)")
    private String id;
    @NotNull
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
    @Enumerated
   // @Column(length = 32, columnDefinition = "varchar(32) default 'TECHNICAL_CONSULTANT'")
    private ROLE role;
    @OneToMany(cascade =  CascadeType.ALL)
    @JoinColumn(name = "employee_id")
    private List<Skill> skills;
    @OneToOne(cascade = CascadeType.REFRESH)
    @Valid
    private Employee assignedTo;
    @NotNull
    private BusinessUnit businessUnit;
    @Column(nullable = true, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createdAt;
    @Column(nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date updatedAt;

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
// method to populate created at and updated at upon persist
    @PrePersist
    public void prePersist() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    // method to populate created at and updated at upon update
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = new Date();
    }


}
