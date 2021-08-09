package com.devnihwl.dscatalog.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration // Classes responsáveis por manter configurações e criar componentes específicos
public class AppConfig {

    @Bean // Componente do Spring para métodos
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
