package com.brunhuemer.tennisticker;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import org.springframework.stereotype.Component;

@Component
public class TestQuery implements GraphQLQueryResolver {

	public String helloWorld() {
		return "Hello World";
	}

	public String getPlayerName(String playerId) {
		return "TestPlayer for player id " + playerId;
	}
}