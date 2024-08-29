CREATE TABLE measurements (
    id SERIAL PRIMARY KEY,
    customer_code VARCHAR(255) NOT NULL,
    measure_datetime TIMESTAMP NOT NULL,
    measure_type VARCHAR(10) CHECK (measure_type IN ('WATER', 'GAS')),
    measure_value INTEGER,
    measure_uuid UUID NOT NULL UNIQUE,
    has_confirmed BOOLEAN DEFAULT FALSE,
    image_url TEXT
);
