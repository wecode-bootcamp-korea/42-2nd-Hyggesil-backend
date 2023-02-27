-- migrate:up
CREATE TABLE rooms (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  hotel_id INT NOT NULL,
  room_number INT NOT NULL
);

-- migrate:down
DROP TABLE rooms;
