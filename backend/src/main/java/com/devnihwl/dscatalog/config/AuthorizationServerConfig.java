package com.devnihwl.dscatalog.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.TokenEnhancerChain;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

import java.util.Arrays;

@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Value("${security.oauth2.client.client-id}")
    private String client_id;

    @Value("${security.oauth2.client.client-secret}")
    private String secret_id;

    @Value("${jwt.duration}")
    private Integer jwtDuration;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    @Qualifier("accessTokenConverter")
    private JwtAccessTokenConverter jwtTokenConverter;

    @Autowired
    private JwtTokenStore tokenStore;

    @Autowired
    private JwtTokenEnhancer enhancer;

    @Override
    public void configure(AuthorizationServerSecurityConfigurer security) throws Exception {
        security.tokenKeyAccess("permitAll()").checkTokenAccess("isAuthenticated()");
    }

    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        clients.inMemory().withClient(client_id)
                .secret(encoder.encode(secret_id))
                .scopes("read","write")
                .authorizedGrantTypes("password")
                .accessTokenValiditySeconds(jwtDuration);
    }

    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
        TokenEnhancerChain chain = new TokenEnhancerChain();
        chain.setTokenEnhancers(Arrays.asList(enhancer,jwtTokenConverter));

        endpoints.authenticationManager(manager)
                .tokenStore(tokenStore)
                .accessTokenConverter(jwtTokenConverter)
                .tokenEnhancer(chain);
    }
}
