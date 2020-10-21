INSERT INTO orders (
    user_id,
    total
)VALUES (
    ${id}, 
    ${total}
)
returning order_id;