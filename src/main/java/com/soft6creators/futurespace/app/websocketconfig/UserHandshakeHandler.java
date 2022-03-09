package com.soft6creators.futurespace.app.websocketconfig;

import java.nio.file.attribute.UserPrincipal;
import java.security.Principal;
import java.util.Map;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

public class UserHandshakeHandler extends DefaultHandshakeHandler {
	
	@Override
	protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler,
			Map<String, Object> attributes) {
		return new UserPrincipal() {
			
			@Override
			public String getName() {
				return SecurityContextHolder.getContext().getAuthentication().getName();
			}
		};
	}

}
