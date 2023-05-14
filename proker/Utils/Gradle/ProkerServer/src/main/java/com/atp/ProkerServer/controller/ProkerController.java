package com.atp.ProkerServer.controller;

import com.atp.ProkerServer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;


import com.atp.ProkerLibrary.API;

@CrossOrigin("*")
@RequestMapping(value = {"/proker", "proker"})
@Controller
public class ProkerController {

    @Autowired
    private UserService userService;

    @ResponseBody
    @PostMapping(value = {"/", ""}, consumes = "application/json", produces = "application/json")
    public Map<String,Object> predict(HttpSession session, @RequestBody Map<String, Object> message) {
        Map<String,Object> map = new HashMap<>();
        API.prova();
        map.put("prova","prova");
        return map;
    }

}
