const express = require("express");
const catatanRoutes = require("./routes/catatanRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.use("/api/v1/", catatanRoutes);
app.use("/api/v1/", authRoutes);

app.listen(3000, () => {
  console.log("Berhasil Jalan Di 3000");
});
