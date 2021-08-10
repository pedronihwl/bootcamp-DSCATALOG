package com.devnihwl.dscatalog.config;

import com.devnihwl.dscatalog.entities.User;
import com.devnihwl.dscatalog.repositories.UserRepository;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenEnhancer implements TokenEnhancer {

    @Autowired
    private UserRepository repository;

    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken oAuth2AccessToken, OAuth2Authentication oAuth2Authentication) {
        User u = repository.findByEmail(oAuth2Authentication.getName());
        Map<String,Object> plus = new HashMap<>();
        plus.put("firstname",u.getFirstName());
        plus.put("id",u.getId());

        DefaultOAuth2AccessToken token = (DefaultOAuth2AccessToken) oAuth2AccessToken;
        token.setAdditionalInformation(plus);
        return oAuth2AccessToken;
    }
}
