package com.soft6creators.futurespace.app.userstatus;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserStatusController {
	@Autowired
	private UserStatusService userStatusService;
	
	@RequestMapping("/userstatus/{userEmail}/status/{status}/date/{date}")
	public UserStatus addUserStatus(@PathVariable String userEmail, @PathVariable boolean status,@PathVariable String date) {
		return userStatusService.addUserStatus(userEmail, status, date);
	}
	
	@RequestMapping("/userstatus/{userEmail}")
	public UserStatus getUserStatus(@PathVariable String userEmail) {
		return userStatusService.getUserStatus(userEmail);
	}
	
	@RequestMapping("/userstatus")
	public List<UserStatus> getAllUserStatus() {
		return userStatusService.getAllUserStatus();
	}
}
