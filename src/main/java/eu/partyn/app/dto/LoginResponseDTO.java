package eu.partyn.app.dto;


import eu.partyn.app.model.ApplicationUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDTO {

    private ApplicationUser user;
    private String jwt;






}
