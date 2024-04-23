package eu.partyn.app.controller;


import eu.partyn.app.dto.LoginResponseDTO;
import eu.partyn.app.dto.RegistrationDTO;
import eu.partyn.app.model.ApplicationUser;
import eu.partyn.app.service.AuthenticationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;




/**
 * Handles authentication requests such as user registration and login.
 */
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthenticationController {

    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegistrationDTO registrationDTO) {
        try {
            ApplicationUser user = authenticationService.registerUser(registrationDTO.getUsername(), registrationDTO.getPassword());
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorMessage(e.getMessage()));
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody RegistrationDTO body) {
        try {
            LoginResponseDTO loginResponse = authenticationService.loginUser(body.getUsername(), body.getPassword());
            if (loginResponse != null && loginResponse.getUser() != null && loginResponse.getJwt() != null) {
                return ResponseEntity.ok(loginResponse);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during login");
        }
    }



}
