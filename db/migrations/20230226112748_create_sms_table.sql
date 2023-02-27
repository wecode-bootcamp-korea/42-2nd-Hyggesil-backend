-- migrate:up
CREATE TABLE sms (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(100) NOT NULL,
  phone_number VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expired_at INT
);

-- migrate:down
DROP TABLE sms;
