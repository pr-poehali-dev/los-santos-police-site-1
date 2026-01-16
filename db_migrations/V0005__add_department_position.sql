ALTER TABLE registrations ADD COLUMN IF NOT EXISTS position VARCHAR(100) DEFAULT 'Кадет';
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS department VARCHAR(100) DEFAULT 'Police Academy (PA)';

UPDATE registrations SET is_admin = true, position = 'Администратор департамента', department = 'Административный' WHERE id = 3;