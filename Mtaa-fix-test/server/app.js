import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { urlencoded } from 'express';
import { errorHandler } from './middleware/error.middleware.js';


// App Init
const App = express();


// Middleware
App.use(cors());
App.use(express.json());
App.use(morgan('dev'));
App.use( urlencoded({ extended: false }) );
App.use( cookieParser() );


// Routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import providerRoutes from './routes/provider.routes.js';
import adminRoutes from './routes/admin.routes.js';

App.use('/api/auth', authRoutes);
App.use('/api/users', userRoutes);
App.use('/api/providers', providerRoutes);
App.use('/api/admin', adminRoutes);


App.use( (req, res, next ) => {
  res.status(404);
  next(new Error('Route not found'));
})

// ----
App.use( errorHandler );

// Default route
App.get('/', (req, res) => {
  res.send('🛠️ MtaaFix API is live');
});


// Server
import { PORT } from './config/env.js';
import connectDB from './database/db.js';

App.listen( PORT, async () => {
  console.log(`MtaaFix API running on http://localhost:${PORT}`);
  await connectDB();
});

export default App;