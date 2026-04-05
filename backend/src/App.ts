import express from "express";
import cors from "cors";
import organizerRoutes from "./routes/organizerRoutes";
import popupRoutes from "./routes/popupRoutes";

// import userRoutes from "./routes/userRoutes";
// import popupRoutes from "./routes/popupRoutes";
// import resourceRoutes from "./routes/resourceRoutes";

const app = express();

app.use(cors());
app.use(express.json());



app.use("/api/organizers", organizerRoutes);
app.use("/api/popups", popupRoutes);

export default app;