package com.fh.skilltracker;

import com.fh.skilltracker.domain.Address;
import com.fh.skilltracker.domain.BusinessUnit;
import com.fh.skilltracker.domain.Employee;
import com.fh.skilltracker.domain.ROLE;
import com.fh.skilltracker.repository.EmployeeRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class EmployeeRepositoryIntegrationTest {

    @Autowired

    private TestEntityManager entityManager;

    @Autowired
    private EmployeeRepository employeeRepository;

    // write test cases here

    @Test
    public void whenFindByName_thenReturnEmployee() {
        // given

        Employee alex = new Employee(UUID.randomUUID().toString(),"alex","habte",new Address(),"g@gmail.com","g@gmail.com","10-10-2020","10-10-1994", ROLE.TECHNICAL_CONSULTANT, BusinessUnit.API_MANAGEMENT);
        entityManager.persist(alex);
        entityManager.flush();

        // when
        Employee found = employeeRepository.findById(alex.getId()).get();

        // then
        assertThat(found.getId())
                .isEqualTo(alex.getId());
    }
}