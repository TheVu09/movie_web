import app from "./app.js";
import { env } from "./config/env.js";

app.listen(env.port, () => {
    console.log(`Movie app running on port ${env.port}`);
});