# RVIST Backend: Production Deployment Guide

This backend kernel is designed for "serious development" and professional deployment.

## Local Development

1. Navigate to the `server` directory.
2. Run `npm install` (requires Node.js).
3. Run `npm start` to launch the Kernel on port 5000.

## Production Deployment (e.g., Render.com)

To deploy this backend to a live server:

### 1. Environment Variables

Create a `.env` file in the `server` directory with:

```env
PORT=5000
NODE_ENV=production
JWT_SECRET=your_secure_random_hash
```

### 2. Deployment Steps (Render)

1. Push your code to a GitHub repository.
2. Connect the repository to **Render.com**.
3. Select **Web Service**.
4. Set Build Command: `npm install`
5. Set Start Command: `node server.js`
6. Add your Environment Variables in the Render dashboard.

### 3. Frontend Configuration

The `RVISTApp/js/app.js` is already configured to automatically detect your production URL. Update the `API_CONFIG.baseUrl` with your live Render URL once deployed.

## Security Protocols

- **Phone Auth**: Standard student authentication.
- **Email Generation**: Automatically handles `@rvnp.ac.ke` assignments.
- **Departmental Firewall**: Announcements are strictly partitioned to prevent data collisions.
