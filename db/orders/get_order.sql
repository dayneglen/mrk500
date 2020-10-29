SELECT oi.quantity, o.order_id, u.first_name, u.last_name, o.total, p.name, p.price, p.img_url, ps.size, ps.tall FROM orders o
JOIN order_item oi ON o.order_id = oi.order_id
JOIN users u ON o.user_id = u.user_id 
JOIN shirt s ON oi.shirt_id = s.shirt_id
JOIN product p on s.product_id = p.product_id
JOIN product_size ps on s.product_size_id = ps.product_size_id
WHERE u.user_id = $1 AND o.order_id = $2;