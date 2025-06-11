///Users/santosa/Documents/GitHub/Software-System-Planning/architecture/Sprint-3(Design & Arch.)(Francisco)/hospital-microservices/api-gateway/src/main/java/com/xai/apigateway/security/JwtAuthenticationToken.java
package com.xai.apigateway.security;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.List;
import java.util.stream.Collectors;

public class JwtAuthenticationToken extends AbstractAuthenticationToken {
    private final Object principal;
    private final List<String> roles;

    public JwtAuthenticationToken(Object principal, List<String> roles) {
        super(roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList()));
        this.principal = principal;
        this.roles = roles;
        setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return principal;
    }
}