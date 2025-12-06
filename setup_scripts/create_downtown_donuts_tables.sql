-- Downtown Donuts schema for CS208 full-stack project
-- Run after install_db.sh
-- Uses existing cs208demo database from the starter template.

USE cs208demo;

-- Drop old tables if you rerun this script while iterating
DROP TABLE IF EXISTS donut_comments;
DROP TABLE IF EXISTS donut_menu_items;

-- Menu items table
CREATE TABLE donut_menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category ENUM('Donuts','Drinks','Seasonal','Other') NOT NULL,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  price DECIMAL(5,2) NOT NULL,
  is_featured TINYINT(1) DEFAULT 0,
  is_available TINYINT(1) DEFAULT 1
);

-- Comments table
CREATE TABLE donut_comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  visit_experience ENUM('Dine-in','Takeout','Delivery') DEFAULT 'Dine-in',
  rating TINYINT NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed some example menu items

INSERT INTO donut_menu_items
  (category, name, description, price, is_featured)
VALUES
  ('Donuts', 'Classic Glazed',
   'Yeast-raised donut with a light vanilla glaze.', 2.25, 1),
  ('Donuts', 'Maple Bar',
   'Rectangle yeast donut topped with real maple icing.', 2.95, 1),
  ('Donuts', 'Downtown Sprinkles',
   'Vanilla cake donut dipped in chocolate and rainbow sprinkles.', 2.75, 1),
  ('Donuts', 'Cinnamon Sugar Twist',
   'Hand-twisted dough rolled in cinnamon sugar.', 2.50, 0),
  ('Drinks', 'House Drip Coffee',
   '12 oz cup of locally roasted drip coffee.', 2.15, 1),
  ('Drinks', 'Vanilla Latte',
   'Espresso with steamed milk and vanilla syrup.', 4.25, 0),
  ('Drinks', 'Cold Brew',
   'Slow-steeped, extra smooth cold brew over ice.', 4.10, 0),
  ('Seasonal', 'Apple Cider Donut (Fall)',
   'Spiced cake donut with apple cider glaze.', 3.10, 1),
  ('Seasonal', 'Peppermint Mocha (Winter)',
   'Holiday mocha with peppermint and shaved chocolate.', 4.65, 0),
  ('Other', 'Downtown Donuts Mug',
   '12 oz ceramic mug with our classic logo.', 12.00, 0);
