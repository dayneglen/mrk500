UPDATE product
SET name = ${name},
    price = ${price},
    img_url = ${img_url}
WHERE product_id = ${id};