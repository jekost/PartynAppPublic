package eu.partyn.app;

import eu.partyn.app.model.ApplicationUser;
import eu.partyn.app.model.Role;
import eu.partyn.app.repository.RoleRepository;
import eu.partyn.app.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class PartynAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(PartynAppApplication.class, args);
	}

	@Bean
	CommandLineRunner run(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder){
		return args -> {
			if(roleRepository.findByAuthority("ADMIN").isPresent())return;

			String adminUsername = System.getenv("ADMIN_USERNAME");
			String adminPassword = System.getenv("ADMIN_PASSWORD");

			Role adminRole = roleRepository.save(new Role("ADMIN"));
			Role userRole = roleRepository.save(new Role("USER"));

			Set<Role> roles = new HashSet<>();
			roles.add(adminRole);
			ApplicationUser admin = new ApplicationUser(1, adminUsername, passwordEncoder.encode(adminPassword), roles);

			userRepository.save(admin);
		};
	}

}
