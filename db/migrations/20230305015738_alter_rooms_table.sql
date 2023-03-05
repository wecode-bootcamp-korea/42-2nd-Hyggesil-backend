-- migrate:up
ALTER TABLE rooms
ADD CONSTRAINT rooms_hotel_id_fk
FOREIGN KEY (hotel_id)
REFERENCES hotels (id);

-- migrate:down
DROP rooms;
