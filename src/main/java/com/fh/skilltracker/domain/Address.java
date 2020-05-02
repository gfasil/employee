package com.fh.skilltracker.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address {
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
    private String description;
    @NotNull
    private String street;
    @NotNull
    private String suite;
    @NotNull
    private String city;
    @NotNull
    private String region;
    @NotNull
    private String country;



}
