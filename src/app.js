/* Green Work ERP by Victor Martinez */

import 'express-async-errors';

// express
import express from 'express';
const app = express();

//rest of packages
import * as config from './configs/config.js';
import { connectDB } from './utils/mysql.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimiter from 'express-rate-limit';
import helmet from 'helmet';
import xss from 'xss-clean';
import cors from 'cors';

// configuration
app.set("port", config.app.port);

//  Cors configuration
const corsOptions = {
  origin: "http://localhost:3000", // Set the specific origin
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow credentials
};

// router
import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import crewRoutes from './routes/crewRoutes.js';
import attendanceRoutes from './routes/attendRoutes.js';
import shiftRoutes from './routes/shiftRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import vendorRoutes from './routes/vendorRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import materialRoutes from './routes/materialRoutes.js';
import appSettingRoutes from './routes/appSettingRoutes.js';
import serviceScheduleRoutes from './routes/serviceScheduleRoutes.js';

// middleware
import notFoundMiddleware from './middlewares/not-found.js';
import errorHandleMiddleware from './middlewares/error-handler.js';
// import { checkPermission } from './controllers/authController.js';

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);

app.use(helmet());
app.use(cors(corsOptions));
app.use(xss());

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req, res) => {
  res.send("Hard Work api");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/employee", employeeRoutes);
app.use("/api/v1/crew", crewRoutes);
app.use("/api/v1/attend", attendanceRoutes);
app.use("/api/v1/shift", shiftRoutes);
app.use("/api/v1/client", clientRoutes);
app.use("/api/v1/vendor", vendorRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/address", addressRoutes);
app.use("/api/v1/service", serviceRoutes);
app.use("/api/v1/material", materialRoutes);
app.use("/api/v1/app-setting", appSettingRoutes);
app.use("/api/v1/service-schedule", serviceScheduleRoutes);

app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);


const server = async () => {
  try {
    await connectDB();

    app.listen(app.get("port"), () => {
      console.log("Server listening on port", app.get("port"));
    });
  } catch (error) {
    console.log(error);
  }
}

server(); 
