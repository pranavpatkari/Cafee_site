package com.cafee.backend.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.ArrayList;
import com.cafee.backend.model.OrderRequest;
import com.cafee.backend.model.CartRequest;
@RestController
@RequestMapping("/api")
public class TestController {
  private final List<OrderRequest> orders =
        new ArrayList<>();
     private int nextOrderNumber = 1001;
    @GetMapping("/ping")
    public String ping() {
        return "Backend Working";
    }

    @GetMapping("/hello/{name}")
    public String hello(@PathVariable String name) {
        return "Hello " + name;
    }

    @GetMapping("/menu")
    public List<Map<String, Object>> menu() {
        return List.of(
                Map.of(
                        "name", "Cheese Burst Burger",
                        "price", 150
                ),
                Map.of(
                        "name", "Cold Coffee",
                        "price", 120
                ),
                Map.of(
                        "name", "Chocolate Brownie",
                        "price", 120
                )
        );
    }
    @GetMapping("/orders")
public List<OrderRequest> getOrders(
        @RequestHeader("X-ADMIN-KEY") String adminKey
) {

    if (!adminKey.equals("cafee-super-secret")) {
        return List.of();
    }

    return orders;
}
@PostMapping("/cart/total")
public Map<String, Integer> total(
        @RequestBody CartRequest cart
) {
    int price = cart.getPrice();
    int qty = cart.getQty();

    return Map.of(
            "total",
            price * qty
    );
  }
@PostMapping("/orders")
public OrderRequest createOrder(
        @RequestBody OrderRequest order
) {
    order.setId(
            UUID.randomUUID().toString()
    );

    order.setOrderNumber(
            nextOrderNumber++
    );

    order.setStatus(
            "PENDING"
    );

    orders.add(order);

    return order;
}

@PutMapping("/orders/{id}/status/{status}")
public OrderRequest updateStatus(
        @RequestHeader("X-ADMIN-KEY") String adminKey,
        @PathVariable String id,
        @PathVariable String status
) {

    if (!adminKey.equals("cafee-super-secret")) {
        return null;
    }

    for (OrderRequest order : orders) {

        if (order.getId().equals(id)) {

            order.setStatus(
                    status.toUpperCase()
            );

            return order;
        }
    }

    return null;
}
}
