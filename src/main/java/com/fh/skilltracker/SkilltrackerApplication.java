package com.fh.skilltracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class SkilltrackerApplication {

    @RequestMapping("/")
    public String main(){

        return "welcome to employee skills tracker";
    }

    public static void main(String[] args) {
        SpringApplication.run(SkilltrackerApplication.class, args);
    }

}
