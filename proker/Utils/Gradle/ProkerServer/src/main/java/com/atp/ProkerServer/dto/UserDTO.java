package com.atp.ProkerServer.dto;

import com.atp.ProkerServer.entity.User;
import org.springframework.data.annotation.Id;

public class UserDTO {

    @Id
    private String id;
    private String name;
    private String email;
    private String pwd;

    public UserDTO() {}

    public UserDTO(User u) {
        this.id = u.getId();
        this.name = u.getName();
        this.email = u.getEmail();
        this.pwd = u.getPwd();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

}