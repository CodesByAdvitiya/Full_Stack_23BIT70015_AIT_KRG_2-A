package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/users")
public class UserController {

    List<String> users = new ArrayList<>(Arrays.asList("Ram", "Shyam", "Rita"));

    @GetMapping
    public List<String> getUsers() {
        return users;
    }

    @GetMapping("/{id}")
    public String getUserById(@PathVariable int id) {
        return users.get(id);
    }

    @PostMapping
    public String addUser(@RequestBody String name) {
        users.add(name);
        return "User Added Successfully!";
    }

    @PutMapping("/{id}")
    public String updateUser(@PathVariable int id, @RequestBody String name) {
        users.set(id, name);
        return "User Updated Successfully!";
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable int id) {
        users.remove(id);
        return "User Deleted Successfully!";
    }
}
