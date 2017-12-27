DROP TABLE IF EXISTS files;

CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  name VARCHAR UNIQUE NOT NULL,
  content TEXT,
  created_on DATE NOT NULL DEFAULT CURRENT_DATE,
  last_edited_on DATE NOT NULL DEFAULT CURRENT_DATE
);
-- TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
