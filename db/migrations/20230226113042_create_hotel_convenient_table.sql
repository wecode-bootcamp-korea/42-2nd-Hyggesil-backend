-- migrate:up
CREATE TABLE hotel_convenient(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  hotel_id INT NOT NULL,
  convenient_id INT NOT NULL,

  CONSTRAINT hotel_convenient_hotel_id_fk FOREIGN KEY (hotel_id) REFERENCES hotels (id),
  CONSTRAINT hotel_convenient_convenient_id_fk FOREIGN KEY (convenient_id) REFERENCES convenients (id) 
);

-- migrate:down
DROP TABLE hotel_convenient;
