const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { createServer } = require('http');
const { Server } = require('socket.io');

require('dotenv').config();

const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const alumniRoutes = require('./routes/alumniRoutes');
const mentorshipRoutes = require('./routes/mentorshipRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const eventRoutes = require('./routes/eventRoutes');
const forumRoutes = require('./routes/forumRoutes');
const chatRoutes = require('./routes/chatRoutes');
const blogRoutes = require('./routes/blogRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
const server = createServer(app);

// Socket.IO setup for real-time features
const io = new Server(server, {
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:8080'],
    methods: ['GET', 'POST']
  }
});

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});

// Middleware
app.use(helmet());
app.use(compression());
app.use(limiter);
app.use(morgan('combined'));
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:8080'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Make io accessible to routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// API Routes
const apiVersion = process.env.API_VERSION || 'v1';
app.use(`/api/${apiVersion}/auth`, authRoutes);
app.use(`/api/${apiVersion}/users`, userRoutes);
app.use(`/api/${apiVersion}/alumni`, alumniRoutes);
app.use(`/api/${apiVersion}/mentorship`, mentorshipRoutes);
app.use(`/api/${apiVersion}/interviews`, interviewRoutes);
app.use(`/api/${apiVersion}/events`, eventRoutes);
app.use(`/api/${apiVersion}/forum`, forumRoutes);
app.use(`/api/${apiVersion}/chat`, chatRoutes);
app.use(`/api/${apiVersion}/blog`, blogRoutes);
app.use(`/api/${apiVersion}/upload`, uploadRoutes);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join user to their personal room for notifications
  socket.on('join-user-room', (userId) => {
    socket.join(`user-${userId}`);
  });

  // Handle chat room joining
  socket.on('join-chat', (chatId) => {
    socket.join(`chat-${chatId}`);
  });

  // Handle new messages
  socket.on('send-message', (data) => {
    socket.to(`chat-${data.chatId}`).emit('new-message', data);
  });

  // Handle typing indicators
  socket.on('typing', (data) => {
    socket.to(`chat-${data.chatId}`).emit('user-typing', data);
  });

  socket.on('stop-typing', (data) => {
    socket.to(`chat-${data.chatId}`).emit('user-stop-typing', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

module.exports = app;