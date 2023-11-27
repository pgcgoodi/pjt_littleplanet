package project.c203.server.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisPassword;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.StringRedisTemplate;

@Configuration
public class RedisConfig {

    @Value("${REDIS_HOST}")
    private String redisHost;

    @Value("${REDIS_PORT}")
    private int redisPort;

    @Value("${REDIS_PASSWORD}")
    private String redisPassword;

    private LettuceConnectionFactory createLettuceConnectionFactory(int database) {
        RedisStandaloneConfiguration config = new RedisStandaloneConfiguration();
        config.setHostName(redisHost);
        config.setPort(redisPort);
        config.setPassword(RedisPassword.of(redisPassword));
        config.setDatabase(database);

        LettuceConnectionFactory lettuceConnectionFactory = new LettuceConnectionFactory(config);
        lettuceConnectionFactory.afterPropertiesSet();
        return lettuceConnectionFactory;
    }

    // 기본 Redis 데이터베이스 인덱스(0)에 대한 StringRedisTemplate 설정
    @Bean
    public StringRedisTemplate stringRedisTemplate() {
        StringRedisTemplate template = new StringRedisTemplate();
        template.setConnectionFactory(createLettuceConnectionFactory(0));
        return template;
    }

    // 두 번째 Redis 데이터베이스 인덱스(1)에 대한 StringRedisTemplate 설정
    @Bean(name = "stringRedisTemplateCommand")
    public StringRedisTemplate stringRedisTemplateCommand() {
        StringRedisTemplate template = new StringRedisTemplate();
        template.setConnectionFactory(createLettuceConnectionFactory(1));
        return template;
    }
}

