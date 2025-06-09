# Database Version Control with Liquibase

## Project Description

This project implements a database version control system using Liquibase to manage schema migrations for Oracle databases in development and production environments. It includes configurations for two Oracle databases running in Docker containers, managed through Liquibase and verified using DBeaver. The project includes a `students` table for academic management, along with initial schema and user tables.

## Project Structure

```
DB_Palomera/
├── changelog.xml                    # Master changelog file
├── changesets/                      # Directory for SQL changesets
│   ├── 001-initial-schema.sql       # Initial schema with example table
│   ├── 002-add-users-table.sql      # Users table
│   ├── 003-create-students-table.sql # Students table
├── liquibase-dev.properties         # Development environment configuration
├── liquibase-prod.properties        # Production environment configuration
└── README.md                       # This file
```

## Prerequisites

- **Docker**: Installed and running
- **DBeaver**: Installed for database management
- **Liquibase**: Configured via Docker
- **Oracle JDBC Driver**: Ensure `ojdbc8.jar` is in `/liquibase/lib/` (remove duplicates from `/liquibase/internal/lib/`)
- **Access to Oracle Databases**: Development (port 1521) and Production (port 1522)
- **Permissions**: Users with appropriate database permissions

## Setup Instructions

### 1. Clean Up Existing Containers

Remove any existing Oracle containers and volumes to avoid conflicts.

```bash
# List all containers (running and stopped)
docker ps -a

# Remove existing Oracle containers
docker rm -f oracle-dev oracle-prod 2>/dev/null || true

# Remove volumes
docker volume rm oracle-dev-data oracle-prod-data 2>/dev/null || true
```

### 2. Create Oracle Database Containers

#### Development Environment (Port 1521)

```bash
docker run -d \
  --name oracle-dev \
  -p 1521:1521 \
  -p 5500:5500 \
  -e ORACLE_PWD=DevPassword123 \
  -e ORACLE_PDB=FREEPDB1 \
  -e ORACLE_CHARACTERSET=AL32UTF8 \
  container-registry.oracle.com/database/free:latest
```

#### Production Environment (Port 1522)

```bash
docker run -d \
  --name oracle-prod \
  -p 1522:1521 \
  -p 5501:5500 \
  -e ORACLE_PWD=ProdPassword123 \
  -e ORACLE_PDB=FREEPDB1 \
  -e ORACLE_CHARACTERSET=AL32UTF8 \
  container-registry.oracle.com/database/free:latest
```

#### Verify Containers

```bash
docker ps
```

Expected output:
```
CONTAINER ID   IMAGE                                    COMMAND                  CREATED         STATUS         PORTS                                            NAMES
xxxxxx         container-registry.oracle.com/database/free:latest   "/bin/bash -c $ORACL…"   2 minutes ago   Up 2 minutes   0.0.0.0:1521->1521/tcp, 0.0.0.0:5500->5500/tcp   oracle-dev
xxxxxx         container-registry.oracle.com/database/free:latest   "/bin/bash -c $ORACL…"   2 minutes ago   Up 2 minutes   0.0.0.0:1522->1521/tcp, 0.0.0.0:5501->5500/tcp   oracle-prod
```

#### Wait for Oracle to Start

Monitor the logs for each container until the database is ready (this may take 5-10 minutes).

```bash
# Development
docker logs -f oracle-dev
```

Wait for: `DATABASE IS READY TO USE!` then press `Ctrl+C`.

```bash
# Production
docker logs -f oracle-prod
```

Wait for: `DATABASE IS READY TO USE!` then press `Ctrl+C`.

### 3. Create Database Users

#### Development User

Connect to the development database as `SYSTEM` using DBeaver:
- **Host**: `localhost`
- **Port**: `1521`
- **Database**: `FREEPDB1`
- **Username**: `system`
- **Password**: `DevPassword123`
- **Connection Type**: Service Name

In DBeaver's SQL Console, run:

```sql
-- Create development user
CREATE USER dev_user IDENTIFIED BY dev_password;
GRANT CONNECT, RESOURCE, DBA TO dev_user;
ALTER USER dev_user QUOTA UNLIMITED ON USERS;

-- Verify user creation
SELECT username FROM dba_users WHERE username = 'DEV_USER';
```

#### Production User

Connect to the production database as `SYSTEM`:
- **Host**: `localhost`
- **Port**: `1522`
- **Database**: `FREEPDB1`
- **Username**: `system`
- **Password**: `ProdPassword123`
- **Connection Type**: Service Name

In DBeaver's SQL Console, run:

```sql
-- Create production user
CREATE USER prod_user IDENTIFIED BY prod_password;
GRANT CONNECT, RESOURCE, DBA TO prod_user;
ALTER USER prod_user QUOTA UNLIMITED ON USERS;

-- Verify user creation
SELECT username FROM dba_users WHERE username = 'PROD_USER';
```

### 4. Configure DBeaver Connections

#### Development Application Connection

Create a new connection in DBeaver:
- **Type**: Oracle
- **Host**: `localhost`
- **Port**: `1521`
- **Database**: `FREEPDB1`
- **Username**: `dev_user`
- **Password**: `dev_password`
- **Connection Type**: Service Name
- **Name**: `Oracle Dev - APP`

Test the connection and save.

#### Production Application Connection

Create a new connection in DBeaver:
- **Type**: Oracle
- **Host**: `localhost`
- **Port**: `1522`
- **Database**: `FREEPDB1`
- **Username**: `prod_user`
- **Password**: `prod_password`
- **Connection Type**: Service Name
- **Name**: `Oracle Prod - APP`

Test the connection and save.

### 5. Configure Liquibase

#### Navigate to Project Directory

```bash
cd /Users/santosa/Documents/GitHub/Software-System-Planning/DB_Palomera
```

#### Fix Duplicate JAR Issue

Remove duplicate `ojdbc8.jar` files to avoid conflicts:

```bash
ls -l /liquibase/lib/ojdbc8.jar
ls -l /liquibase/internal/lib/ojdbc8.jar
rm /liquibase/lib/ojdbc8.jar 2>/dev/null || true
```

Ensure only one `ojdbc8.jar` exists in `/liquibase/lib/`.

#### Create Changeset for Students Table

```bash
mkdir -p changesets
cat > changesets/003-create-students-table.sql << 'EOF'
--liquibase formatted sql
--changeset santosa:003-create-students-table

-- Create students table for academic management
CREATE TABLE students (
    id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    first_name VARCHAR2(100) NOT NULL,
    last_name VARCHAR2(100) NOT NULL,
    email VARCHAR2(255) NOT NULL,
    enrollment_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add unique constraint for email
ALTER TABLE students ADD CONSTRAINT uk_students_email UNIQUE (email);

-- Create index on email for better performance
CREATE INDEX idx_students_email ON students(email);

-- Create index on enrollment_date for queries
CREATE INDEX idx_students_enrollment_date ON students(enrollment_date);

-- Add comments to document the table
COMMENT ON TABLE students IS 'Student information table for academic management';
COMMENT ON COLUMN students.id IS 'Primary key - auto-incrementing student ID';
COMMENT ON COLUMN students.first_name IS 'Student first name';
COMMENT ON COLUMN students.last_name IS 'Student last name';
COMMENT ON COLUMN students.email IS 'Student email address - must be unique';
COMMENT ON COLUMN students.enrollment_date IS 'Date when student enrolled';
COMMENT ON COLUMN students.created_at IS 'Record creation timestamp';
EOF
```

#### Create Other Changesets

```bash
cat > changesets/001-initial-schema.sql << 'EOF'
--liquibase formatted sql
--changeset santosa:001-initial-schema
CREATE TABLE example (
    id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name VARCHAR2(255) NOT NULL
);
EOF

cat > changesets/002-add-users-table.sql << 'EOF'
--liquibase formatted sql
--changeset santosa:002-add-users-table
CREATE TABLE users (
    user_id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    username VARCHAR2(50) NOT NULL,
    email VARCHAR2(255) NOT NULL
);
EOF
```

#### Update Changelog File

```bash
cat > changelog.xml << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<databaseChangeLog
    xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
    http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-latest.xsd">

    <changeSet id="001-initial-schema" author="santosa">
        <sqlFile path="changesets/001-initial-schema.sql"/>
    </changeSet>

    <changeSet id="002-add-users-table" author="santosa">
        <sqlFile path="changesets/002-add-users-table.sql"/>
    </changeSet>

    <changeSet id="003-create-students-table" author="santosa">
        <sqlFile path="changesets/003-create-students-table.sql"/>
    </changeSet>
</databaseChangeLog>
EOF
```

#### Create Liquibase Properties Files

**Development**:

```bash
cat > liquibase-dev.properties << 'EOF'
changeLogFile=changelog.xml
url=jdbc:oracle:thin:@//localhost:1521/FREEPDB1
username=dev_user
password=dev_password
driver=oracle.jdbc.OracleDriver
EOF
```

**Production**:

```bash
cat > liquibase-prod.properties << 'EOF'
changeLogFile=changelog.xml
url=jdbc:oracle:thin:@//localhost:1522/FREEPDB1
username=prod_user
password=prod_password
driver=oracle.jdbc.OracleDriver
EOF
```

#### Configure Liquibase Alias

```bash
alias liquibase='docker run --rm --network host -v "$(pwd)":/liquibase/workspace -w /liquibase/workspace liquibase/liquibase'
```

Add this alias to your shell configuration (e.g., `~/.zshrc` or `~/.bashrc`) for persistence:

```bash
echo "alias liquibase='docker run --rm --network host -v \"\$(pwd)\":/liquibase/workspace -w /liquibase/workspace liquibase/liquibase'" >> ~/.zshrc
source ~/.zshrc
```

### 6. Run Liquibase Commands

#### Verify Status (Development)

```bash
liquibase --defaultsFile=liquibase-dev.properties status
```

#### Apply Changes (Development)

```bash
liquibase --defaultsFile=liquibase-dev.properties update
```

#### Verify Status (Production)

```bash
liquibase --defaultsFile=liquibase-prod.properties status
```

#### Apply Changes (Production)

```bash
liquibase --defaultsFile=liquibase-prod.properties update
```

### 7. Verify in DBeaver

#### Development

1. Connect to `Oracle Dev - APP` in DBeaver.
2. Expand `Tables` in the database navigator.
3. Verify tables: `EXAMPLE`, `USERS`, `STUDENTS`.
4. Right-click `STUDENTS` → `View Data`.
5. Take a screenshot of the table structure (`Schema` view).

#### Production

1. Connect to `Oracle Prod - APP` in DBeaver.
2. Expand `Tables` in the database navigator.
3. Verify tables: `EXAMPLE`, `USERS`, `STUDENTS`.
4. Right-click `STUDENTS` → `View Data`.
5. Take a screenshot of the table structure (`Schema` view).

### 8. Generate Report Data

#### Development Verification

Connect to `Oracle Dev - APP` in DBeaver and run:

```sql
-- Table structure
SELECT column_name, data_type, nullable, data_default 
FROM user_tab_columns 
WHERE table_name = 'STUDENTS' 
ORDER BY column_id;

-- Constraints
SELECT constraint_name, constraint_type, search_condition 
FROM user_constraints 
WHERE table_name = 'STUDENTS';

-- Indexes
SELECT index_name, column_name, column_position
FROM user_ind_columns 
WHERE table_name = 'STUDENTS'
ORDER BY index_name, column_position;
```

Take a screenshot of the results.

#### Production Verification

Connect to `Oracle Prod - APP` in DBeaver and run the same queries:

```sql
-- Table structure
SELECT column_name, data_type, nullable, data_default 
FROM user_tab_columns 
WHERE table_name = 'STUDENTS' 
ORDER BY column_id;

-- Constraints
SELECT constraint_name, constraint_type, search_condition 
FROM user_constraints 
WHERE table_name = 'STUDENTS';

-- Indexes
SELECT index_name, column_name, column_position
FROM user_ind_columns 
WHERE table_name = 'STUDENTS'
ORDER BY index_name, column_position;
```

Take a screenshot of the results.

### 9. Screenshots for Report

Include the following screenshots in your report:
1. **DBeaver Connections**: Database navigator showing all four connections (`Oracle Dev - SYSTEM`, `Oracle Prod - SYSTEM`, `Oracle Dev - APP`, `Oracle Prod - APP`).
2. **Students Table Structure (Development)**: Schema view of `STUDENTS` table in `Oracle Dev - APP`.
3. **Students Table Structure (Production)**: Schema view of `STUDENTS` table in `Oracle Prod - APP`.
4. **Liquibase Status (Development)**: Terminal output of `liquibase --defaultsFile=liquibase-dev.properties status`.
5. **Liquibase Status (Production)**: Terminal output of `liquibase --defaultsFile=liquibase-prod.properties status`.
6. **Verification Query Results (Development)**: Results of the SQL queries for table structure, constraints, and indexes in `Oracle Dev - APP`.
7. **Verification Query Results (Production)**: Results of the SQL queries for table structure, constraints, and indexes in `Oracle Prod - APP`.

## Additional Liquibase Commands

### View History

```bash
# Development
liquibase --defaultsFile=liquibase-dev.properties history

# Production
liquibase --defaultsFile=liquibase-prod.properties history
```

### Generate Documentation

```bash
liquibase --defaultsFile=liquibase-dev.properties dbDoc docs/
```

### Rollback Changes (if needed)

```bash
# Rollback one changeset (Development)
liquibase --defaultsFile=liquibase-dev.properties rollout-count 1

# Rollback one changeset (Production)
liquibase --defaultsFile=liquibase-prod.properties rollout-count 1
```

## Workflow

1. **Develop Changes**:
   - Create a new SQL file in `changesets/` (e.g., `004-new-change.sql`).
   - Add the changeset to `changelog.xml`.
   - Test in development using `liquibase --defaultsFile=liquibase-dev.properties update`.

2. **Verify Changes**:
   - Check status: `liquibase --defaultsFile=liquibase-dev.properties status`.
   - Verify tables in DBeaver.

3. **Deploy to Production**:
   - Check production status: `liquibase --defaultsFile=liquibase-prod.properties status`.
   - Apply changes: `liquibase --defaultsFile=liquibase-prod.properties update`.

## Best Practices

- **Naming Convention**: Use `XXX-description-of-change.sql` for changeset files.
- **Atomic Changes**: One changeset per SQL file for easier rollbacks.
- **Test in Development**: Always apply and verify changes in development first.
- **Backup**: Back up production database before applying changes.
- **Documentation**: Add comments to complex SQL changes for clarity.

## Troubleshooting

### Duplicate JAR Files

**Error**: `WARNING: *** Duplicate ojdbc JAR files ***`

#### Solution
```bash
rm /liquibase/lib/ojdbc8.jar 2>/dev/null
```
Ensure only one `ojdbc8.jar` exists in `/liquibase/lib/`.

### No Listener Error

**Error**: `ORA-12541: Cannot connect. No listener at host localhost port 1521/1522`

#### Solution
- Verify Docker containers are running: `docker ps`.
- Check logs: `docker logs oracle-dev` or `docker logs oracle-prod`.
- Ensure the database is fully started (`DATABASE IS READY TO USE`).
- Check containers: `docker restart oracle-dev`.

### Missing Properties File

**Error**: `Could not find defaults file liquibase-dev.properties`

#### Solution
- Ensure `liquibase-dev.properties` and `liquibase-prod.properties` exist in the project directory.
- Verify the file path in the Liquibase command.

### Missing Changelog File

**Error**: `Error parsing command line: Invalid argument '--changelog-file': missing required argument`

#### Solution
- Ensure `changelog.xml` exists and is referenced in `liquibase-dev.properties` and `liquibase-prod.properties`.
- Verify the `changeLogFile` property: `changeLogFile=changelog.xml`.

### Oracle Quota Error

**Error**: `ORA-01950: The user has insufficient quota on tablespace USERS`

#### Solution
```sql
ALTER USER dev_user QUOTA UNLIMITED ON USERS;
ALTER USER prod_user QUOTA UNLIMITED ON USERS;
```

## Environments

- **Development**: `localhost:1521/FREEPDB1`
- **Production**: `localhost:1522/FREEPDB1`

## Author

- **Name**: Santos A. (santosa)
- **Project**: Database Version Control Setup
- **Date**: June 2025

## Additional Resources

- [Liquibase Documentation](https://docs.liquibase.com)
- [Oracle JDBC Documentation](https://docs.oracle.com/en/database/oracle/oracle-database/)
- [Liquibase Best Practices](https://www.liquibase.org/get-started/best-practices)
- [DBeaver Documentation](https://dbeaver.io/docs/)