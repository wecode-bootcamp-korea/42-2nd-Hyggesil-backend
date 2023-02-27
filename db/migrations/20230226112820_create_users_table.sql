-- migrate:up
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  phone_number VARCHAR(100) NOT NULL,
  points DECIMAL(15,2) NOT NULL DEFAULT 10000000,
  is_host BOOLEAN NOT NULL DEFAULT false,
  kakao_id VARCHAR(100) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT users_email_uk UNIQUE (email),
  CONSTRAINT users_phone_number_uk UNIQUE (phone_number),
  CONSTRAINT users_kakao_id_uk UNIQUE (kakao_id)
);

-- migrate:down
DROP TABLE users;
