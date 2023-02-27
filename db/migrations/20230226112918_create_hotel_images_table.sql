-- migrate:up
CREATE TABLE hotel_images (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
hotel_id INT NOT NULL,
url VARCHAR(1000) NULL,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,

CONSTRAINT hotel_images_hotel_id_fk FOREIGN KEY (hotel_id) REFERENCES hotels (id)
);

-- migrate:down
DROP TABLE hotel_images;

