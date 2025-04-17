package com.example.web_content_management_back.controller;

import com.example.web_content_management_back.dto.UserDTO;
import com.example.web_content_management_back.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable String id) {
        return userService.getUserById(id);
    }

    @PostMapping
    public UserDTO createUser(@RequestBody UserDTO userDTO) {
        return userService.createUser(userDTO);
    }

    @PutMapping("/{id}")
    public UserDTO updateUser(@PathVariable String id, @RequestBody UserDTO userDTO) {
        return userService.updateUser(id, userDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }
    @GetMapping("/{id}/is-responsible")
    public boolean isResponsible(@PathVariable String id) {
        return userService.isResponsible(id);
    }

    @GetMapping("/responsible/{responsibleId}")
    public List<UserDTO> getUsersByResponsibleId(@PathVariable String responsibleId) {
        return userService.getUsersByResponsibleId(responsibleId);
    }

}