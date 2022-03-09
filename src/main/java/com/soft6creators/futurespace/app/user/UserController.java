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

	@RequestMapping("/user")
	public User getUser(Principal principal) {
		Address address = addressService.getAddressByEmail(principal.getName());
		if (address != null) {
			return address.getUser();
		} else {
			Optional<User> user = userService.getUser(principal.getName());
			user.get().setAccountNonLocked(false);
			return user.get();
		}

	}
	
	@RequestMapping("/admin")
	public String getAdmin(Principal principal) {
		return principal.getName();
	}

	@RequestMapping("/verify/{verificationCode}")
	private boolean verify(@PathVariable String verificationCode) {
		return userService.verify(verificationCode);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/user")
	private User updateUser(@RequestBody User user) {
		return userService.addUser(user);
	}
}
