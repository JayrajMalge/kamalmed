# Kamal Medicare Cancer Centre & Hospital

Full-stack hospital website with Angular 17 frontend, Spring Boot 3.2 backend, and MariaDB database. Supports specializations, sub-specializations, facilities, diseases, news/blogs, treatments, doctors, appointments, JWT auth, Google OAuth, and a full admin panel.

## Project is for LOCAL use — run in your own environment, not on Replit.

## Where things live

```
hospital-backend/          Spring Boot 3.2 (port 8080)
  src/main/java/com/kamalmedicare/
    entity/                All JPA entities
    repository/            Spring Data JPA repos
    service/               Business logic
    controller/            REST controllers
    security/              JWT + OAuth2
    config/                CORS + Web config
    dto/                   Request/Response DTOs
    util/                  FileStorageService
  src/main/resources/
    application.properties DB + JWT + OAuth config
    db/schema.sql          Full MariaDB schema (run once)

hospital-frontend/         Angular 17 (port 4200)
  src/app/
    core/                  Models, services, guards, interceptor
    shared/                Navbar, Footer, Rich-text editor
    features/
      home/                Landing page
      specialization/      List + detail with sub-specs
      facility/            Facility list
      disease/             Disease browser with sidebar
      news/                News & blog list + article view
      treatment/           Treatment list
      doctor/              Doctor list + detail + appointment booking
      auth/                Login, Register, OAuth callback
      admin/               Full CRUD admin panel (sidebar layout)
```

## Stack

- **Frontend:** Angular 17, ngx-quill (bold/italic/lists), SCSS
- **Backend:** Spring Boot 3.2, Spring Security, Spring Data JPA
- **Auth:** JWT (jjwt 0.11.5), Google OAuth2
- **DB:** MariaDB + Hibernate (ddl-auto=update)
- **Images:** Filesystem-based (./uploads/), paths stored in DB

## How to run locally

### 1. Database
```sql
-- Create the database and run schema:
mysql -u root -p < hospital-backend/src/main/resources/db/schema.sql
```
Default admin user is seeded: **username: admin / password: Admin@123**

### 2. Backend
```bash
cd hospital-backend
# Edit src/main/resources/application.properties:
#   spring.datasource.password=YOUR_PASSWORD
#   spring.security.oauth2.client.registration.google.client-id=YOUR_ID
#   spring.security.oauth2.client.registration.google.client-secret=YOUR_SECRET
mvn spring-boot:run
```
Backend runs at http://localhost:8080

### 3. Frontend
```bash
cd hospital-frontend
npm install
npm start
# Runs at http://localhost:4200 with proxy to backend
```

## Architecture decisions

- Images are stored on the filesystem (`./uploads/{subfolder}/`) and served via Spring's static resource handler — no DB blobs
- JWT token is stored in localStorage; OAuth callback passes token via URL query param
- Angular uses lazy-loaded feature modules for all routes
- Admin panel routes are guarded by AdminGuard (checks role === 'Admin' from JWT)
- Rich-text editor (Quill) is restricted to bold, italic, and lists only — no color/font options
- `ddl-auto=update` auto-creates/updates tables on first run; the schema.sql is a clean reference and for initial setup

## User preferences

- User wants complete code to run in their own environment (not Replit)
- Angular 17 + Spring Boot 3.2 + MariaDB stack
- Images in filesystem folders, paths in DB (not blobs)
- Admin-only: bold/italic/lists rich-text editor (Quill, no color)
- Google OAuth + JWT authentication

## Gotchas

- Set `spring.datasource.password` before running the backend
- The `./uploads` directory is created automatically by FileStorageService on first file upload
- Google OAuth requires valid client-id/secret; it can be left blank and the feature simply won't work
- `jwt.secret` in application.properties must be at least 32 characters for HS256 to work
- Angular proxy (proxy.conf.json) routes `/api` and `/uploads` to `http://localhost:8080`
