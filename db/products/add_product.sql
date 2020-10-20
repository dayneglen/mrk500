INSERT INTO product (
    name,
    price,
    img_url
) VALUES (
    ${name},
    ${price},
    ${img_url}
)

returning product_id;