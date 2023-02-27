-- migrate:up
CREATE TABLE reviews (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  hotel_id INT NOT NULL,
  description VARCHAR(3000),
  star DECIMAL(2,1) NOT NULL DEFAULT 0,
  image VARCHAR(1000),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT reviews_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT reviews_hotel_id_fk FOREIGN KEY (hotel_id) REFERENCES hotels (id)
);

-- migrate:down
DROP TABLE reviews;