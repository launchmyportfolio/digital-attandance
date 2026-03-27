# Junglee Russian Force - Digital Attendance Management

Full-stack attendance system built with React (Vite) + Tailwind, Node/Express, MongoDB, JWT auth.

## Project Structure
```
backend/
  config/ db.js
  controllers/ authController.js employeeController.js adminController.js
  middleware/ auth.js
  models/ Employee.js Attendance.js
  routes/ authRoutes.js employeeRoutes.js adminRoutes.js
  utils/ generateToken.js
  server.js
frontend/
  index.html
  package.json
  tailwind.config.js postcss.config.js vite.config.js
  src/
    App.jsx main.jsx index.css
    components/ Navbar.jsx Sidebar.jsx ProtectedRoute.jsx Loader.jsx Toast.jsx Logo.jsx
    context/ AuthContext.jsx jwtDecode.js
    pages/ Home.jsx Login.jsx AdminLogin.jsx Register.jsx EmployeeDashboard.jsx MarkAttendance.jsx AttendanceHistory.jsx Profile.jsx AdminDashboard.jsx EmployeeList.jsx AttendanceReport.jsx EmployeeAttendanceDetail.jsx
    services/ api.js auth.js employee.js admin.js
```

## Backend Setup (Ubuntu)
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and adjust:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017
MONGO_DB=junglee_russian_force
JWT_SECRET=supersecretjwtstring
JWT_EXPIRES_IN=2h
```
4. Start MongoDB (`sudo systemctl start mongod`)
5. Seed admin auto-creates on server start (email `admin@junglee.com`, password `Admin@123`).
6. Run dev server: `npm run dev` (nodemon) or `npm start`.

## Frontend Setup (Ubuntu)
1. `cd frontend`
2. `npm install`
3. Start dev server: `npm run dev`
4. Vite dev server proxies `/api` to `http://localhost:5000`.

## Default Admin
- Email: `admin@junglee.com`
- Password: `Admin@123`

## Notes
- JWT stored in localStorage, auto-logout on expiry via client decode.
- Attendance unique per employee+date enforced in DB.
- Employee can edit only today’s record (checked server + UI).
- Admin CSV export available from Reports page.
