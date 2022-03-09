package com.soft6creators.futurespace.app.userstatus;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.soft6creators.futurespace.app.address.Address;
import com.soft6creators.futurespace.app.address.AddressRepository;
import com.soft6creators.futurespace.app.message.MessageRepository;
import com.soft6creators.futurespace.app.user.User;

@Service
public class UserStatusService {

	@Autowired
	private UserStatusRepository userStatusRepository;
	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;
	@Autowired 
	private MessageRepository messageRepository;
	@Autowired
	private AddressRepository addressRepository;


	public UserStatus addUserStatus(String userEmail, boolean status, String date) {
		User user = new User();
		user.setEmail(userEmail);

		UserStatus userStatus = new UserStatus();
		userStatus.setUser(user);
		userStatus.setOnline(status);
		userStatus.setDate(date);
		simpMessagingTemplate.convertAndSend("/topic/status", userStatusRepository.save(userStatus));

		return userStatus;
	}

	public UserStatus getUserStatus(String userEmail) {
		return userStatusRepository.findFirstByUserEmailOrderByUserStatusIdDesc(userEmail);
	}

	public List<UserStatus> getAllUserStatus() {
		List<UserStatus> userStatuses = new ArrayList<>();
		List<Address> usersAddress = (List<Address>) addressRepository.findAll();
		
		for (Address userAddress : usersAddress) {
			UserStatus userStatus = userStatusRepository.findFirstByUserEmailOrderByUserStatusIdDesc(userAddress.getUser().getEmail());
			userStatuses.add(userStatus);
		}
		return userStatuses;
	}
	
}
