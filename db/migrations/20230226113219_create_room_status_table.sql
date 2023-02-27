-- migrate:up
CREATE TABLE room_status (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  room_id INT NOT NULL,
  date DATE NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT true,

  CONSTRAINT room_status_room_id_fk FOREIGN KEY (room_id) REFERENCES rooms (id)
  
);

-- migrate:down
DROP TABLE room_status;
