package eu.partyn.app.config;


import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import eu.partyn.app.utils.RSAKeyProperties;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

/**
 * Security configuration for the application, setting up JWT-based authentication and defining
 * security rules for various endpoints.
 */
@Configuration
@AllArgsConstructor
public class SecurityConfiguration {

    private final RSAKeyProperties keys;
    private static final String ROLE_ADMIN = "ADMIN";
    private static final String ROLE_USER = "USER";



    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authManager(UserDetailsService detailsService, PasswordEncoder passwordEncoder){
        DaoAuthenticationProvider daoProvider = new DaoAuthenticationProvider();
        daoProvider.setUserDetailsService(detailsService);
        daoProvider.setPasswordEncoder(passwordEncoder);
        return new ProviderManager(daoProvider);
    }


    /**
     * Configures security filter chain that specifies CSRF protection, session creation policy,
     * and rules for protected resources.
     *
     * @param httpSecurity the HttpSecurity to configure
     * @return the configured SecurityFilterChain
     * @throws Exception on configuration errors
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        JwtAuthenticationConverter jwtAuthenticationConverter = jwtAuthenticationConverter();

        httpSecurity
                .csrf(csrf -> csrf.disable())  // Disable CSRF protection as JWT is used which is immune to CSRF
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/auth/login/**").permitAll()
                        .requestMatchers("/h2-console/**").permitAll()
                        .requestMatchers("/events/admin/**").hasRole(ROLE_ADMIN)
                        .requestMatchers("/events/user/**").hasAnyRole(ROLE_ADMIN, ROLE_USER)
                        .requestMatchers("/events/**").permitAll()
                        .anyRequest().authenticated()  // Require authentication for all other requests
                )
                .headers(headers ->  // Configure headers
                        headers
                                .defaultsDisabled()  // Disable default headers
                                .cacheControl(withDefaults())  // Enable default cache control
                                .frameOptions(frame -> frame.disable())  // Disable frame options to allow H2 console
                                .contentTypeOptions(withDefaults())  // Enable default content type options
                                .xssProtection(withDefaults())  // Enable default XSS protection
                                .httpStrictTransportSecurity(withDefaults())  // Enable default strict transport security
                )
                .oauth2ResourceServer(oauth -> oauth.jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter))) // Enable JWT based authentication
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));  // Use stateless session; session won't be used to store user's state.

        return httpSecurity.build();
    }




    @Bean
    public JwtDecoder jwtDecoder(){
        return NimbusJwtDecoder.withPublicKey(keys.getPublicKey()).build();

    }



    @Bean
    public JwtEncoder jwtEncoder(){
        JWK jwk = new RSAKey.Builder(keys.getPublicKey()).privateKey(keys.getPrivateKey()).build();
        JWKSource<SecurityContext> jwks = new ImmutableJWKSet<>(new JWKSet(jwk));
        return new NimbusJwtEncoder(jwks);
    }


    /**
     * Provides a custom JWT authentication converter to extract authorities from JWT claims.
     *
     * @return A JwtAuthenticationConverter instance.
     */
    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter(){
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthoritiesClaimName("roles");
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");

        JwtAuthenticationConverter jwtConverter = new JwtAuthenticationConverter();
        jwtConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);

        return jwtConverter;

    }


}
