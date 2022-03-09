package com.soft6creators.futurespace.app.securityconfig;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.soft6creators.futurespace.app.user.MyUserDetails;
import com.soft6creators.futurespace.app.user.User;
import com.soft6creators.futurespace.app.user.UserRepository;

@Service
public class MyUserDetailsService implements UserDetailsService {
	@Autowired
	UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> user = userRepository.findById(username);
		user.orElseThrow(() -> new UsernameNotFoundException("Not Found" + username));
		return user.map(MyUserDetails::new).get();
	}
	
	

}
