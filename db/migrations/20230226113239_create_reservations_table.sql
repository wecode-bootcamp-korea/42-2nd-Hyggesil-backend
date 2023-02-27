-- migrate:up
CREATE TABLE reservations (
  uuid VARCHAR(300) NOT NULL PRIMARY KEY,
  total_price DECIMAL(15, 2) NOT NULL,
  check_in date NOT NULL,
  check_out date NOT NULL,
  user_id INT NOT NULL,
  room_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT reservations_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT reservations_room_id_fk FOREIGN KEY (room_id) REFERENCES rooms (id)
);


-- migrate:down
DROP TABLE reservations;

