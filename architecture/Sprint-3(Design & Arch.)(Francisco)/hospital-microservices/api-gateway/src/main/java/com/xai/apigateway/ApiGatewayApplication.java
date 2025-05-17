///Users/santosa/Documents/GitHub/Software-System-Planning/architecture/Sprint-3(Design & Arch.)(Francisco)/hospital-microservices/api-gateway/src/main/java/com/xai/apigateway/ApiGatewayApplication.java
package com.xai.apigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ApiGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("pacientes", r -> r.path("/api/pacientes/**")
                        .uri("lb://microservice-pacientes"))
                .route("citas", r -> r.path("/api/citas/**")
                        .uri("lb://microservice-citas"))
                .route("alertas", r -> r.path("/api/alertas/**")
                        .uri("lb://microservice-alertas"))
                .build();
    }
}