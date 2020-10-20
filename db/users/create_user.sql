INSERT INTO users (
    first_name,
    last_name,
    email,
    hash,
    is_admin
)VALUES (
    ${firstName},
    ${lastName},
    ${email},
    ${hash},
    ${is_admin}
)
returning user_id, first_name, last_name, email, is_admin;