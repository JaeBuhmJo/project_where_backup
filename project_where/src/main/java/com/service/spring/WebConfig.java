package com.service.spring;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer{
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 URL에 CORS 설정 적용
            .allowedOrigins("http://127.0.0.1:5500/") // 모든 출처 허용
            .allowedMethods("GET", "POST", "PUT", "DELETE") // 허용하는 HTTP 메서드
            .allowedHeaders("*") // 허용하는 헤더
            .allowCredentials(true); // 쿠키 사용 허용
    }
}
