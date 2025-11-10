import app from "./app";
import { appConfig } from "./config/app.config";

// const PORT = process.env.PORT;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT} Anjat`);
// });

app.listen(appConfig.PORT, () => {
  console.log(`Server running on port ${appConfig.PORT} - it's Pijag Coffee`);
});