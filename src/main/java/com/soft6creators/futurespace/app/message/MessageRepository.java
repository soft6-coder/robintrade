package com.soft6creators.futurespace.app.message;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends CrudRepository<Message, Integer> {
	public List<Message> findByFromUserEmailOrToUserEmailOrderByMessageIdDesc(String fromUser, String toUser);
	
	@Query("SELECT distinct fromUser.email FROM Message where fromUser.email not in('cryptospaceinvestments@gmail.com') order by messageId desc")
	public List<String> findDistinctByFromUser();
	
	public Message findFirstByFromUserEmailOrToUserEmailOrderByMessageIdDesc(String fromUser, String toUser);
	
}
