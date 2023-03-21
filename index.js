const app = require("./app");
const {connectDB} = require("./db/connect");

const start = async () => {
  try {
    await connectDB();

    app.listen(app.get("port"), () => {
      console.log("Server listening on port", app.get("port"));
    });
  } catch (error) {
    console.log(error);
  }
};
start();
