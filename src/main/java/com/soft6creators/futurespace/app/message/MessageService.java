package com.soft6creators.futurespace.app.message;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class MessageService {
	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;
	@Autowired
	private MessageRepository messageRepository;
	
	public void sendMessage(Message message) {
		simpMessagingTemplate.convertAndSendToUser(message.getToUser().getEmail(), "/topic/live-chat", messageRepository.save(message));
	}
	
	public void isTyping(String toUser, boolean condition) {
		simpMessagingTemplate.convertAndSendToUser(toUser, "/topic/typing", condition);
	}
	
	
	public List<Message> getMessageByUserToUser(String fromUser, String toUser) {
		return messageRepository.findByFromUserEmailOrToUserEmailOrderByMessageIdDesc(fromUser, toUser);
	}
	public List<Message> getMessageByUserToUserDistinct(String fromUser, String toUser) {
		List<Message> messages = new ArrayList<>();
		List<String> userEmails = messageRepository.findDistinctByFromUser();
		
		for(String userEmail : userEmails) {
			messages.add(messageRepository.findFirstByFromUserEmailOrToUserEmailOrderByMessageIdDesc(userEmail, userEmail));
		}
		
		return messages;
	}

}
