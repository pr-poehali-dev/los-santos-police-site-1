CREATE TABLE IF NOT EXISTS site_settings (
    id SERIAL PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO site_settings (key, value) VALUES
    ('hero_title', 'Los Santos Police Department'),
    ('hero_subtitle', 'Защищая и служа городу'),
    ('about_mission', 'Los Santos Police Department — это элитное подразделение на сервере Majestic RP, посвященное поддержанию порядка и защите граждан города. Мы стремимся создать безопасную среду для всех жителей и обеспечить справедливость.'),
    ('about_history', 'Основанный в начале существования сервера, LSPD стал одной из самых уважаемых организаций. За годы службы наши офицеры провели тысячи операций и спасли бесчисленное количество жизней.')
ON CONFLICT (key) DO NOTHING;