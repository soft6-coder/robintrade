package com.soft6creators.futurespace.app.websocketconfig;

import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.soft6creators.futurespace.app.userstatus.UserStatusService;

@Component
public class SessionDisconnectEventListener implements ApplicationListener<SessionDisconnectEvent> {
	@Autowired
	UserStatusService userStatusService;

	@Override
	public void onApplicationEvent(SessionDisconnectEvent event) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("E MMM dd yyyy hh:mm:ss 'GMT' Z");
		userStatusService.addUserStatus(event.getUser().getName(), false, simpleDateFormat.format(Calendar.getInstance().getTime()));
	}
	
	
	
	
}
