-- migrate:up
CREATE TABLE hotel_areas (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- migrate:down
DROP TABLE hotel_areas;
