package com.atp.ProkerServer.controller;

import com.atp.ProkerServer.dto.UserDTO;
import com.atp.ProkerServer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Controller
public class UserController {

    @Autowired
    private UserService service;
    
    @GetMapping(value = {"/register", "register"})
    public String registerForm(HttpSession session, Model model) {
        BaseController.checkNotLoggedIn(session);
        model.addAttribute("userDTO", new UserDTO());
        return "register_form";
    }

    @PostMapping(value = {"/register", "register"})
    public String registerSubmit(HttpSession session, @ModelAttribute UserDTO userDTO) {
        BaseController.checkNotLoggedIn(session);
        UserDTO userDTO_reg = service.register(userDTO);
        userDTO.setId(userDTO_reg.getId());
        //  Check k estigui ben logejat i tota la pesca
        session.setAttribute("dpc_auth_id", userDTO.getId());
        return "register_submit";
    }

    @GetMapping(value = {"/login", "login"})
    public String loginForm(HttpSession session, Model model) {
        BaseController.checkNotLoggedIn(session);
        model.addAttribute("userDTO", new UserDTO());
        return "login_form";
    }

    @PostMapping(value = {"/login", "login"})
    public String loginSubmit(HttpSession session, @ModelAttribute UserDTO userDTO) {
        BaseController.checkNotLoggedIn(session);
        UserDTO userDTO_reg = service.login(userDTO);
        session.setAttribute("dpc_auth_id", userDTO_reg.getId());
        return "login_submit";
    }

    @RequestMapping(value = {"/logout", "logout"})
    public String logout(HttpSession session, Model model) {
        BaseController.getLoggedUser(session);
        session.removeAttribute("dpc_auth_id");
        return "redirect:/";
    }
}
