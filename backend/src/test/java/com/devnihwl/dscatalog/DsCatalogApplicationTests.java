package com.devnihwl.dscatalog;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class DsCatalogApplicationTests {

	//Testes transacionais -> Roolback no banco após o teste para retornar dados ao estado default

	@Test
	void contextLoads() {
	}

}
