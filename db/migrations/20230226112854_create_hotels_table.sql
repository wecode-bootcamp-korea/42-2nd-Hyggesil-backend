-- migrate:up
CREATE TABLE hotels (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  address VARCHAR(300) NOT NULL,
  latitude DECIMAL(20,15) NOT NULL,
  longtitude DECIMAL(20,15) NOT NULL,
  price DECIMAL(15,2) NOT NULL,
  guest_max INT NOT NULL DEFAULT 1,
  bedrooms INT NOT NULL DEFAULT 1,
  beds INT NOT NULL DEFAULT 1,
  bathrooms INT NOT NULL DEFAULT 1,
  thumbnail_url VARCHAR(1000) NULL,
  user_id INT NOT NULL,
  area_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  
  CONSTRAINT hotels_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT hotels_area_id_fk FOREIGN KEY (area_id) REFERENCES hotel_areas (id)
);

-- migrate:down
DROP TABLE hotels;
