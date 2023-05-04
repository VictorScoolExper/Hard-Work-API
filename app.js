require("express-async-errors");

// express
const express = require("express");
const app = express();

// file handler
const fileUpload = require('express-fileupload');

//rest of packages
const config = require("./config");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");

// configuration
app.set("port", config.app.port);

//  Cors configuration
const corsOptions = {
  origin: "http://localhost:3000", // Set the specific origin
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow credentials
};

// router
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoute");
const crewRoutes = require("./routes/crewRoutes");
const attendanceRoutes = require("./routes/attendRoutes");
const shiftRoutes = require("./routes/shiftRoutes");
const clientRoutes = require("./routes/clientRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const companyRoutes = require("./routes/companyRoutes");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandleMiddleware = require("./middleware/error-handler");

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

app.use(fileUpload);

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

app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);

module.exports = app;
