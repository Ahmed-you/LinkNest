BEGIN;

DROP TABLE IF EXISTS links, categories, users;

-- USERS
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  google_id TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- CATEGORIES
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- LINKS
CREATE TABLE links (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT now()
);

INSERT INTO users (username, email, password_hash)
VALUES 
('Ahmed', 'ahmed@example.com', 'hashedpassword1'),
('Lina', 'lina@example.com', 'hashedpassword2');

INSERT INTO categories (user_id, name, icon, color)
VALUES 
(1, 'Dev Tools', 'wrench', '#FFB703'),
(1, 'Design Inspo', 'palette', '#A8DADC'),
(2, 'Recipes', 'utensils', '#F4A261');

INSERT INTO links (user_id, category_id, title, url, tags)
VALUES 
(1, 1, 'VS Code', 'https://code.visualstudio.com', ARRAY['editor', 'dev']),
(1, 2, 'Dribbble', 'https://dribbble.com', ARRAY['design', 'inspo']),
(2, 3, 'Falafel Recipe', 'https://example.com/falafel', ARRAY['food', 'middle east']);

COMMIT;
