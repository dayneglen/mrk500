SELECT s.shirt_id, p.name, p.price, p.img_url, ps.size, ps.tall FROM shirt s
JOIN product p ON s.product_id = p.product_id
JOIN product_size ps ON s.product_size_id = ps.product_size_id
WHERE p.product_id = $1 AND ps.product_size_id = $2;