package com.atp.ProkerServer.controller;

import com.atp.ProkerServer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@RequestMapping(path = "/")
@Controller
public class HomeController {

    @Autowired
    private UserService service;

    @RequestMapping(value = {"/", ""})
    public String home(HttpSession session, Model model) {
        return "home";
    }

}
