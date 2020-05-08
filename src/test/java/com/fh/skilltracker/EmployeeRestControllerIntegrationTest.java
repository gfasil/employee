package com.fh.skilltracker;

import com.fh.skilltracker.domain.Employee;
import com.fh.skilltracker.repository.EmployeeRepository;
import com.fh.skilltracker.util.JsonUtil;
import com.fh.skilltracker.util.Util;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import java.io.IOException;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.CoreMatchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = SkilltrackerApplication.class, webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@TestPropertySource(
        locations = "classpath:application-integrationtest.properties")
public class EmployeeRestControllerIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private EmployeeRepository repository;

    // write test cases here
    Employee employee1=Util.TEST_DATA.apply("user1 first name","user1 last name");
   Employee employee2=Util.TEST_DATA.apply("user2 first name","user2 last name");

    @After
    public void resetDb() {
        repository.deleteAll();
    }

    @Test
    public void givenEmployees_whenGetEmployees_thenStatus200()
            throws Exception {

        // populating database with test data
            createTestEmployee();

        mvc.perform(get("/employees")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content()
                        .contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].firstName", is(employee1.getFirstName())))
                .andExpect(jsonPath("$[1].firstName", is(employee2.getFirstName())));
    }
    @Test
    public void whenValidInput_thenCreateEmployee() throws IOException, Exception {

        mvc.perform(post("/employees").contentType(MediaType.APPLICATION_JSON).content(JsonUtil.toJson(employee1)));
        List<Employee> found = repository.findAll();
        assertThat(found).extracting(Employee::getFirstName).containsOnly(employee1.getFirstName());
    }

    private void createTestEmployee() {

        repository.saveAndFlush(employee1);
        repository.saveAndFlush(employee2);
    }

}