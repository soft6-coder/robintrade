package com.soft6creators.futurespace.app.crypto;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CryptoRepository extends CrudRepository<Crypto, Integer> {

}
