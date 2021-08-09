package com.devnihwl.dscatalog.repositories;

import com.devnihwl.dscatalog.entities.Product;
import com.devnihwl.dscatalog.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {
}
