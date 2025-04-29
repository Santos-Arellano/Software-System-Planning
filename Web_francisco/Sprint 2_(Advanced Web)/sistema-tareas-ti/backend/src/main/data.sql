-- Usuarios iniciales
INSERT INTO users (name, role, level, available, is_leader) VALUES
('Juan Pérez', 'PROGRAMADOR', 'SENIOR', true, true),
('María García', 'PROGRAMADOR', 'SENIOR', true, false),
('Carlos Rodríguez', 'PROGRAMADOR', 'JUNIOR', true, false),
('Ana López', 'PROGRAMADOR', 'JUNIOR', true, false);

-- Tareas iniciales
INSERT INTO tasks (title, description, critical, status, created_at) VALUES
('Corrección de bug en login', 'Solucionar problema de autenticación en el sistema', true, 'PENDING', CURRENT_TIMESTAMP),
('Optimización de consultas SQL', 'Mejorar rendimiento de las consultas en el módulo de reportes', true, 'PENDING', CURRENT_TIMESTAMP),
('Crear página de contacto', 'Diseñar e implementar página de contacto según mockup', false, 'PENDING', CURRENT_TIMESTAMP),
('Actualizar documentación', 'Poner al día la documentación técnica del proyecto', false, 'PENDING', CURRENT_TIMESTAMP),
('Implementar nuevos iconos', 'Actualizar los iconos del sistema con el nuevo diseño', false, 'PENDING', CURRENT_TIMESTAMP);