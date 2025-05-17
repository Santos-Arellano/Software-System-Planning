///Users/santosa/Documents/GitHub/Software-System-Planning/architecture/Sprint-3(Design & Arch.)(Francisco)/hospital-microservices/api-gateway/src/main/java/com/xai/apigateway/config/SecurityConfig.java
package com.xai.apigateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import reactor.core.publisher.Mono;
import com.xai.apigateway.security.JwtAuthenticationToken;
import java.util.Map;
import java.util.List;
import java.util.Collections;
import java.util.stream.Collectors;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeExchange(exchanges -> exchanges
                .pathMatchers("/auth/**", "/actuator/**", "/actuator/health/**").permitAll()
                .anyExchange().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt
                    .jwtAuthenticationConverter(token -> {
                        Map<String, Object> claims = token.getClaims();
                        Map<String, Object> realmAccess = (Map<String, Object>) claims.getOrDefault("realm_access", Collections.emptyMap());
                        @SuppressWarnings("unchecked")
                        List<String> roles = ((List<Object>) realmAccess.getOrDefault("roles", Collections.emptyList()))
                            .stream()
                            .map(Object::toString)
                            .collect(Collectors.toList());
                        return Mono.just(new JwtAuthenticationToken(token, roles));
                    })
                )
            );
        return http.build();
    }
}