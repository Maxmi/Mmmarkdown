DROP TABLE IF EXISTS files;

CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- every time a file is touched - this trigger will update file's modified_at column, so that file will be displayed on top of the list 

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.modified_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_file_modtime
  BEFORE UPDATE ON files
  FOR EACH ROW EXECUTE PROCEDURE
  update_modified_column();
