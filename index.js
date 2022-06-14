// const http = require("http");
// http
//   .createServer((req, res) => {
//     res.writeHead(200, { "content-type": "application/json" });
//     res.write(
//       JSON.stringify({
//         name: "varun",
//         email: "varun@gmail.com",
//         mobile: "8085463577",
//       })
//     );
//     res.end();
//   })
//   .listen(5000);

// const app = require("./app");

// console.log(app.name);

// /////

// let array = [2, 3, 4, 5, 6, 7, 8, 9];
// let result = array.filter((item) => {
//   return item > 6;
// });
// console.log(result);

// //////

// const fs = require("fs");
// fs.writeFileSync("hello.txt", "hello varun");

// //////

// console.log("path", __dirname);
// console.log("filename", __filename);

// ////////

// const http = require("http");
// http
//   .createServer((req, res) => {
//     res.write("<h1>helloo Varun Patidar</h1>");
//     res.end();
//   })
//   .listen(4000);

// ////
// console.log("Hello");

// const express = require("express");
// const app = express();
// app.get("", (req, res) => {
//   res.send(`<h1>Welcome to home page</h1>
//   <a href="/about">Go to About Page</a>
//   `);
// });
// app.get("/about", (req, res) => {
//   res.send(`<input type="text" placeholder="Enter Your Name"/>
//   <button type="submit">Button</button><br />
//   <a href="/">Home</a>
//   `);
// });
// app.listen(5000);

// const express = require("express");
// const app = express();
// const reqFilter = (res, req, next) => {
//   app.get("/about", (req, res) => {
//     res.send(`<h1>Welcome to About page</h1>`);
//   });

//   app.get("*", (req, res) => {
//     res.send(`<h1>404 Page Not Found</h1>`);
//   });

//   next();
// };
// app.use(reqFilter);

// app.get("/", (req, res) => {
//   res.send(`<h1>Welcome to home page</h1>`);
// });

// app.listen(5000);

const express = require("express");
const dbConnect = require("./mongodb");
const mongodb = require("mongodb");

const app = express();
app.use(express.json());

//Get API-------------------------------------------------------------------------------
app.get("/", async (req, res) => {
  let data = await dbConnect();
  data = await data.find().toArray();
  res.send(data);
});

//Post Api------------------------------------------------------------------------------
app.post("/", async (req, res) => {
  let data = await dbConnect();
  let result = await data.insert(req.body);
  res.send(result);
});

//Put API-------------------------------------------------------------------------------
app.put("/", async (req, res) => {
  let data = await dbConnect();
  let result = await data.updateOne({ name: "Sprite" }, { $set: req.body });
  res.send(result);
});

//put with quary params--------------
app.put("/:name", async (req, res) => {
  let data = await dbConnect();
  let result = await data.updateOne(
    { name: req.params.name },
    { $set: req.body }
  );
  res.send(result);
});

//Delete API-----------------------------------------------------------------------------
app.delete("/:id", async (req, res) => {
  // console.log(req.params.id);
  const data = await dbConnect();
  const result = await data.deleteOne({
    _id: new mongodb.ObjectId(req.params.id),
  });
  res.send(result);
});

//----------------------------------------------------------------------------------------
app.listen(5000);
