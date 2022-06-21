package com.soft6creators.futurespace.app.user;

import java.security.Principal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.soft6creators.futurespace.app.address.Address;
import com.soft6creators.futurespace.app.address.AddressService;

@RestController
public class UserController {
	@Autowired
	private UserService userService;
	@Autowired
	private AddressService addressService;

	@RequestMapping(method = RequestMethod.POST, value = "/user")
	public User addUser(@RequestBody User user) {
		return userService.addUser(user);
	}
	
	@RequestMapping("/user/email/{email}")
	public User getUser(@PathVariable String email) {
		Address address = addressService.getAddressByEmail(email);
		if (address != null) {
			return address.getUser();
		} else {
			Optional<User> user = userService.getUser(email);
			user.get().setAccountNonLocked(false);
			return user.get();
		}

	}

	@RequestMapping("/signin/email/{email}/password/{password}")
	public User signIn(@PathVariable String email, @PathVariable String password) {
		return userService.signIn(email, password);
	}
	
	
	@RequestMapping("/admin")
	public String getAdmin(Principal principal) {
		return principal.getName();
	}

	@RequestMapping("/verify/{verificationCode}")
	private boolean verify(@PathVariable String verificationCode) {
		return userService.verify(verificationCode);
	}
	
	@RequestMapping("/user/{email}/resend")
	public boolean resend(@PathVariable String email) {
		return userService.resend(email);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/user")
	private User updateUser(@RequestBody User user) {
		return userService.addUser(user);
	}
}
