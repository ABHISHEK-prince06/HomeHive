# HomeHive Setup & Run Tutorial

This tutorial explains how to start MongoDB, configure the `.env` file, seed demo data, launch the backend and frontend, and verify the core provider search, map, and booking flows.

## Quick start: run the project in order

Use these commands in PowerShell from the project root:

```powershell
# 1) Start MongoDB
net start MongoDB

# 2) Go to the project root
cd "C:\Users\abhis\Downloads\HomeHive"

# 3) Create .env if it does not exist
if (!(Test-Path .env)) {
  @"
MONGO_URI=mongodb://localhost:27017/homehive
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NODE_ENV=development
PORT=5000
"@ | Set-Content .env
}

# 4) Install backend dependencies
cd server
npm install

# 5) Install frontend dependencies
cd ..\client
npm install

# 6) Seed demo data
cd ..\server
npm run seed

# 7) Start the backend
npm run dev
```

Open a new PowerShell window and run:

```powershell
cd "C:\Users\abhis\Downloads\HomeHive\client"
npm run dev
```

The app should run at:
- Backend: http://localhost:5000
- Frontend: http://localhost:5173

## 1. Start MongoDB

HomeHive requires a running MongoDB instance.

### Option A: Local MongoDB service on Windows
1. Open PowerShell.
2. Run:
   ```powershell
   net start MongoDB
   ```
3. If the service is not installed, install MongoDB using the official installer or use MongoDB Compass.

### Option B: Start MongoDB manually
1. Open PowerShell.
2. Navigate to your MongoDB `bin` folder, for example:
   ```powershell
   cd "C:\Program Files\MongoDB\Server\6.0\bin"
   ```
3. Start the server:
   ```powershell
   .\mongod.exe --dbpath "C:\data\db"
   ```
4. Keep that terminal open while HomeHive is running.

### Confirm MongoDB is running
Open a new PowerShell window and run:
```powershell
mongo --eval "db.runCommand({ ping: 1 })"
```
If MongoDB is running, it returns `{ ok: 1 }`.

## 2. Configure `.env`

Create a `.env` file in the `HomeHive` root directory. You can copy the provided `.env.example` file:

```powershell
cd "C:\Users\abhis\Downloads\HomeHive"
copy .env.example .env
```

Open `.env` in VS Code and confirm it contains at least:

```env
MONGO_URI=mongodb://localhost:27017/homehive
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
PORT=5000
```

For a local demonstration, the important value is:
```env
MONGO_URI=mongodb://localhost:27017/homehive
```

If you do not have Cloudinary credentials yet, you may leave the Cloudinary values blank for now. However, the backend is already wired for future image uploads.

## 3. Install dependencies (if not already installed)

### Backend
```powershell
cd "C:\Users\abhis\Downloads\HomeHive\server"
npm install
```

### Frontend
```powershell
cd "C:\Users\abhis\Downloads\HomeHive\client"
npm install
```

## 4. Seed demo data

Populate the database with seeded users, services, providers, and demo accounts.

```powershell
cd "C:\Users\abhis\Downloads\HomeHive\server"
npm run seed
```

This command will create:
- `customer@homehive.demo`
- `provider@homehive.demo`
- `admin@homehive.demo`

The demo password for all seeded accounts is:
```text
HomeHive123
```

## 5. Launch the backend

Run the backend server from the `server` folder.

```powershell
cd "C:\Users\abhis\Downloads\HomeHive\server"
npm run dev
```

The backend runs on:
```text
http://localhost:5000
```

## 6. Launch the frontend

Open a new terminal and run the frontend from the `client` folder.

```powershell
cd "C:\Users\abhis\Downloads\HomeHive\client"
npm run dev
```

Vite will start the React app and usually open or show a local URL such as:
```text
http://localhost:5173
```

## 7. Verify core application behavior

### Provider Search
1. Open the frontend URL in your browser.
2. Use the homepage search bar or visit `/search`.
3. Search for `Electrician` near pincode `641105`.
4. Confirm the search results list shows professionals.
5. Verify the backend logs show a search request to `/api/search/providers`.

### Map visualization
1. On the search results page, confirm the map is visible.
2. Confirm the customer marker appears at Coimbatore location.
3. Confirm provider markers appear on the map.
4. If the search radius expands, the map circle should display the active radius.

### Booking workflow
1. Click `View Profile` for any provider.
2. Confirm the provider profile page loads.
3. If booking UI is available, open the booking panel and enter:
   - Date
   - Start time
   - Duration
   - Number of people
   - Food required / tip
4. Submit the booking form.
5. Confirm the backend receives the booking request at `/api/bookings`.
6. Verify booking status appears in the customer or provider dashboard.

## 8. Helpful notes

- If the backend cannot connect to MongoDB, re-check `MONGO_URI` and ensure MongoDB is running.
- If the frontend fails to load, confirm `npm install` completed successfully in the `client` folder.
- Use `Postman` or a browser to verify these endpoints:
  - `http://localhost:5000/api/auth/login`
  - `http://localhost:5000/api/search/providers`
  - `http://localhost:5000/api/bookings`

## 9. Demo accounts

Use these seeded accounts:

- Customer: `customer@homehive.demo` / `HomeHive123`
- Provider: `provider@homehive.demo` / `HomeHive123`
- Admin: `admin@homehive.demo` / `HomeHive123`

## 10. Troubleshooting

### MongoDB not starting
- Make sure the service is installed.
- If using `mongod.exe`, confirm the `dbpath` folder exists.
- If using a custom URI, update `.env` accordingly.

### Environment variables not loading
- Ensure `.env` is in the `HomeHive` root, not inside `server` or `client`.
- Restart the backend after editing `.env`.

### Seed command fails
- Confirm the backend dependencies installed successfully.
- Confirm MongoDB is running before `npm run seed`.

---

You now have a complete execution guide for spinning up HomeHive, seeding the demo dataset, and validating search, map, and booking functionality.
