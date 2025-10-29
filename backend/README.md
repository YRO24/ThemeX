# ThemeX Backend

Backend API for ThemeX application built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5.0 or higher)
- npm or yarn

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
   - Set `MONGODB_URI` to your MongoDB connection string
   - Adjust `PORT` if needed (default is 5000)
   - Set `ALLOWED_ORIGINS` to match your frontend URL

## MongoDB Setup

### Option 1: Local MongoDB

1. Install MongoDB locally:
   - macOS: `brew install mongodb-community`
   - Ubuntu: Follow [MongoDB installation guide](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
   - Windows: Download from [MongoDB website](https://www.mongodb.com/try/download/community)

2. Start MongoDB:
```bash
# macOS
brew services start mongodb-community

# Ubuntu/Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

3. Verify MongoDB is running:
```bash
mongosh
```

### Option 2: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/themex?retryWrites=true&w=majority
```

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000` (or your configured PORT).

## API Endpoints

### Health Check
- `GET /api/health` - Check server and database status

### Workspace
- `GET /api/workspace/load?userId=default-user` - Load workspace data
- `POST /api/workspace/save` - Save workspace data
- `DELETE /api/workspace/delete?userId=default-user` - Delete workspace
- `GET /api/workspace/all` - Get all workspaces (debugging)

### Collections
- `GET /api/collections?userId=default-user&library=local` - Get collections
- `POST /api/collections` - Create new collection
- `POST /api/collections/:collectionId/icons` - Add icon to collection

### Icons
- `GET /api/icons?userId=default-user` - Get all icons
- `POST /api/icons/favourites` - Toggle icon in favourites

## Testing the API

You can test the API using curl or Postman:

```bash
# Health check
curl http://localhost:5000/api/health

# Save workspace
curl -X POST http://localhost:5000/api/workspace/save \
  -H "Content-Type: application/json" \
  -d '{
    "icons": [],
    "placedIcons": [],
    "localCollections": [],
    "globalCollections": [],
    "favouriteIcons": []
  }'

# Load workspace
curl http://localhost:5000/api/workspace/load?userId=default-user
```

## Project Structure

```
backend/
├── models/           # MongoDB schemas
│   └── Workspace.js
├── routes/           # API routes
│   ├── workspace.js
│   ├── collections.js
│   └── icons.js
├── server.js         # Main server file
├── package.json
├── .env.example
└── README.md
```

## Frontend Integration

The frontend is already configured to save data to the backend. When you press the power button:

1. Data is saved to localStorage (immediate)
2. Data is sent to the backend API (async)
3. If backend is unavailable, localStorage serves as fallback

Make sure the backend is running before using the save functionality.

## Future Enhancements

- [ ] User authentication (JWT)
- [ ] Image optimization and CDN integration
- [ ] Real-time collaboration with WebSockets
- [ ] Export workspace as JSON/ZIP
- [ ] Versioning and history
- [ ] Admin dashboard

## Troubleshooting

### MongoDB Connection Issues

1. Check if MongoDB is running:
```bash
mongosh
```

2. Verify connection string in `.env`

3. Check MongoDB logs:
```bash
# macOS
tail -f /usr/local/var/log/mongodb/mongo.log

# Linux
tail -f /var/log/mongodb/mongod.log
```

### CORS Issues

Make sure `ALLOWED_ORIGINS` in `.env` matches your frontend URL.

### Port Already in Use

Change the `PORT` in `.env` or stop the process using port 5000:
```bash
# macOS/Linux
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

## License

MIT
