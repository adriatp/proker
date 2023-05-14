package com.atp.ProkerServer.service;

import com.atp.ProkerServer.controller.exceptions.ServiceException;
import com.atp.ProkerServer.dto.UserDTO;
import com.atp.ProkerServer.entity.User;
import com.atp.ProkerServer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public List<UserDTO> getUserList() {
        return repository.findAll().stream().map(u -> {
            UserDTO vo = new UserDTO();
            vo.setId(u.getId());
            vo.setName(u.getName());
            vo.setEmail(u.getEmail());
            return vo;
        }).collect(Collectors.toList());
    }

    public UserDTO getUserById(String id) {
        return repository.findById(id).map(u -> {
            UserDTO vo = new UserDTO();
            vo.setId(u.getId());
            vo.setName(u.getName());
            vo.setEmail(u.getEmail());
            return vo;
        }).orElse(null);
    }

    public UserDTO getUserByEmail(String email) {
        return repository.findByEmail(email).map(u -> {
            UserDTO vo = new UserDTO();
            vo.setId(u.getId());
            vo.setName(u.getName());
            vo.setEmail(u.getEmail());
            return vo;
        }).orElse(null);
    }

    public void saveUser(UserDTO vo) {
        User user = new User();
        user.setName(vo.getName());
        user.setEmail(vo.getEmail());
        user.setPwd(vo.getPwd());
        repository.save(user);
    }

    public void updateUser(UserDTO vo) {
        User user = new User();
        user.setId(vo.getId());
        user.setName(vo.getName());
        user.setEmail(vo.getEmail());
        user.setPwd(vo.getPwd());
        repository.save(user);
    }

    public void deleteUser(UserDTO vo) {
        User user = new User();
        user.setId(vo.getId());
        repository.delete(user);
    }

    public UserDTO login(UserDTO vo1) {
        Optional<User> users = repository.findByEmail(vo1.getEmail());
        if (!users.isPresent())
            throw new ServiceException("User does not exists");
        User user = users.get();

        if (user.getPwd().equals(vo1.getPwd()))
            return new UserDTO(user);
        else
            throw new ServiceException("Password does not match");
    }

    public UserDTO register(UserDTO vo) {
        if (repository.findByEmail(vo.getEmail()).isPresent())
            throw new ServiceException("Email already exist");
        saveUser(vo);
        return getUserByEmail(vo.getEmail());
    }
}