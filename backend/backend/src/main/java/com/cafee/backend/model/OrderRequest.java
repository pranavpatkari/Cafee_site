package com.cafee.backend.model;

public class OrderRequest {

    private String id;
    private String customer;
    private String item;
    private int quantity;
    private String status;
    private int orderNumber;
    public String getId() {
    return id;
     }

    public void setId(String id) {
    this.id = id;
    }
    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    public int getOrderNumber() {
    return orderNumber;
    }

    public void setOrderNumber(int orderNumber) {
    this.orderNumber = orderNumber;
    }
}
