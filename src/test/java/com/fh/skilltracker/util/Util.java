package com.fh.skilltracker.util;

import com.fh.skilltracker.domain.*;

import java.util.Random;
import java.util.UUID;
import java.util.function.BiFunction;
import java.util.function.Supplier;

public class Util {

    public static final BiFunction<String,String, Employee> TEST_DATA= Util::apply;

    public static final Supplier<Address> TEST_DATA_ADDRESS=()->{

        Address address= new Address();
        String ran=UUID.randomUUID().toString().substring(0,3);
        address.setCity("city" + ran);
        address.setCountry("country"+ran);
        address.setDescription("N IOWA" + ran + "USA");
        address.setRegion("IOWA");
        address.setSuite("AP"+ new Random().nextInt(10));
        address.setStreet("00"+new Random().nextInt(3));
        return address;
    };

    private static Employee apply(String firstName, String lastname) {
        Employee emp = new Employee();
        emp.setFirstName(firstName);
        emp.setAddress(TEST_DATA_ADDRESS.get());
        emp.setAssignedTo(null);
        emp.setBirthDate("10-1-2012");
        emp.setBusinessUnit(BusinessUnit.API_MANAGEMENT);
        emp.setCompanyEmail("user1@gmail.com");
        emp.setContactEmail("user2@gmail.com");
        emp.setHiredDate("6-10-2020");
        emp.setFirstName(firstName);
        emp.setLastName(lastname );
        emp.setRole(ROLE.TECHNICAL_CONSULTANT);
        //emp.setSkills(Arrays.asList(new Skill()));
        return emp;
    }
}
