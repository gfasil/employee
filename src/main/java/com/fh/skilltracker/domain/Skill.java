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
public class Skill {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(
            name = "uuid",
            strategy = "uuid"
    )
    @Column(columnDefinition = "CHAR(32)")
    @NotNull
    private String id;
    private String description;
    @OneToOne(cascade=CascadeType.ALL)
    @NotNull
    private Field filed;
    @NotNull
    private String experience;
    private String Summary;

}
