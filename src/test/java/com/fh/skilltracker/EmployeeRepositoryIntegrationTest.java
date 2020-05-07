package com.fh.skilltracker;

import com.fh.skilltracker.domain.Employee;
import com.fh.skilltracker.repository.EmployeeRepository;
import com.fh.skilltracker.util.Util;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@TestPropertySource(
        locations = "classpath:application-integrationtest.properties")
public class EmployeeRepositoryIntegrationTest {

    @Autowired

    private TestEntityManager entityManager;

    @Autowired
    private EmployeeRepository employeeRepository;

    // write test cases here
    Employee employee1= Util.TEST_DATA.apply("user1 first name","user1 last name");
    @Test
    public void whenFindByName_thenReturnEmployee() {
        // given

         entityManager.persist(employee1);
        entityManager.flush();

        // when
        Employee found = employeeRepository.findById(employee1.getId()).get();

        // then
        assertThat(found.getId())
                .isEqualTo(employee1.getId());
    }
}