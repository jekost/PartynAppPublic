package eu.partyn.app.controller;


import eu.partyn.app.dto.LoginResponseDTO;
import eu.partyn.app.dto.RegistrationDTO;
import eu.partyn.app.model.ApplicationUser;
import eu.partyn.app.service.AuthenticationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;


/**
 * Handles authentication requests such as user registration and login.
 */
@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
@AllArgsConstructor
public class AuthenticationController {

    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public ApplicationUser registerUser(@RequestBody RegistrationDTO body){
        return authenticationService.registerUser(body.getUsername(), body.getPassword());


    }

    @PostMapping("/login")
    public LoginResponseDTO loginUser(@RequestBody RegistrationDTO body){
        return authenticationService.loginUser(body.getUsername(), body.getPassword());

    }

}
