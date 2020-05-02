package com.fh.skilltracker.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("")
public class HomeController {

    public String main(){

        return "welcome to employee skills tracker";
    }
}
