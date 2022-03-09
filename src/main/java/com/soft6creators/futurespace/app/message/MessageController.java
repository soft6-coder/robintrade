package com.soft6creators.futurespace.app.message;

import java.security.Principal;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.soft6creators.futurespace.app.user.User;

@RestController
public class MessageController {

	@Autowired
	private MessageService messageService;

	@RequestMapping(method = RequestMethod.POST, value = "/send-message")
	public void sendMessage(@RequestBody Message message, Principal principal) {
		User user = new User();
		user.setEmail(principal.getName());
		message.setFromUser(user);
		messageService.sendMessage(message);
	}
	
	@RequestMapping("/typing/{toUser}/{condition}")
	public void isTyping(@PathVariable String toUser, @PathVariable boolean condition) {
		messageService.isTyping(toUser, condition);
	}

	@RequestMapping("/message/{toUser}")
	public List<Message> getMessageFromUserToUser(@PathVariable String toUser, Principal principal) {
		return messageService.getMessageByUserToUser(principal.getName(), toUser);
	}
	
	@RequestMapping("/admin/message/{fromUser}")
	public List<Message> getMessageFromUser(@PathVariable String fromUser) {
		return messageService.getMessageByUserToUser(fromUser, fromUser);
	}
	
	@RequestMapping("/message/{toUser}/distinct")
	public List<Message> getMessageFromUserToUserDistinct(@PathVariable String toUser, Principal principal) {
		return messageService.getMessageByUserToUserDistinct(principal.getName(), toUser);
	}
	
	

}
