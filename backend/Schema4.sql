CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  user_level ENUM('super_admin', 'admin', 'student'),
  username VARCHAR(255),
  password VARCHAR(255),
  email VARCHAR(255),
  created_at DATETIME
);

CREATE TABLE universities (
  university_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  location VARCHAR(255),
  description TEXT,
  num_students INT,
  picture VARCHAR(255)
);

CREATE TABLE admins (
  admin_id INT AUTO_INCREMENT PRIMARY KEY,
  university_id INT,
  user_id INT,
  FOREIGN KEY (university_id) REFERENCES universities(university_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE rsos (
  rso_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  university_id INT,
  admin_id INT,
  created_at DATETIME,
  FOREIGN KEY (university_id) REFERENCES universities(university_id),
  FOREIGN KEY (admin_id) REFERENCES admins(admin_id)
);

CREATE TABLE rso_memberships (
  membership_id INT AUTO_INCREMENT PRIMARY KEY,
  rso_id INT,
  user_id INT,
  FOREIGN KEY (rso_id) REFERENCES rsos(rso_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE events (
  event_id INT AUTO_INCREMENT PRIMARY KEY,
  rso_id INT,
  name VARCHAR(255),
  category VARCHAR(255),
  description TEXT,
  time TIME,
  date DATE,
  location_name VARCHAR(255),
  contact_phone VARCHAR(255),
  contact_email VARCHAR(255),
  is_public BOOLEAN,
  is_approved BOOLEAN,
  FOREIGN KEY (rso_id) REFERENCES rsos(rso_id)
);

CREATE TABLE event_comments (
  comment_id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT,
  user_id INT,
  comment_text TEXT,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  created_at DATETIME,
  updated_at DATETIME,
  FOREIGN KEY (event_id) REFERENCES events(event_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE social_network_accounts (
  account_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  platform ENUM('Facebook', 'Google'),
  access_token VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);