package com.inventory.productmanagementsystem.Model;

public class User {
    private Long id;
    private String name;
    private Long mobileNumber;
    private String email;
    private String password;
    private String address;
    private Integer role;   // 0 -> Admin, 1 -> Customer

    public User() {
    }

    public User(String name, Long mobileNumber, String email, String password, String address, Integer role) {
        this.name = name;
        this.mobileNumber = mobileNumber;
        this.email = email;
        this.password = password;
        this.address = address;
        this.role = role;
    }

    public User(Long id, String name, Long mobileNumber, String email, String password, String address, Integer role) {
        this.id = id;
        this.name = name;
        this.mobileNumber = mobileNumber;
        this.email = email;
        this.password = password;
        this.address = address;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(Long mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getRole() {
        return role;
    }

    public void setRole(Integer role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "User {" +
                "id = " + id +
                ", name = '" + name + '\'' +
                ", mobileNumber = " + mobileNumber +
                ", email = '" + email + '\'' +
                ", password = '" + password + '\'' +
                ", address = '" + address + '\'' +
                ", role = " + role +
                '}';
    }
}