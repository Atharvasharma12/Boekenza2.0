//for seller Registration

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const sendmail = require("./SendMail");

// const sendmail = require("./SendMail");

//creating app
const app = express();

//for sending res and req we use these
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//connection with mongo db
mongoose
  .connect("mongodb://0.0.0.0:27017/BokenzaDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"))
  .catch((err) => {
    console.log("unable to connect to DB  " , err);
  });

//>>>>>>>>>>>>>>>>  SECTION FOR AND LOGIN  <<<<<<<<<<+++++++++<<<<<<<<<<<<

//create schema for database
const userSchema = mongoose.Schema({
  name: "string",
  email: "string",
  password: "string",
});

//creating model to assing data into schema
const userModel = new mongoose.model("userModel", userSchema);

app.get("/", (req, res) => {
  res.send("server is running....");
});

const obg = {
  milaKya: false,
};

const middleware = (req, res, next) => {
  console.log("middleware");
};

app.post("/LoginPage", (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  userModel
    //findOne is query of mongo use to find atleast 1 document and return
    .findOne({ email: email })
    .then((foundUser) => {
      if (foundUser) {
        if (password === foundUser.password) {
          console.log("user and password found");
          //sending message and details of user which is later use for whether login or not
          obg.milaKya = true;
          res.send({ message: "user login success", user: foundUser });
        } else {
          console.log("password not matched");
          res.send({ message: "password not matched" });
        }
      } else {
        res.send({ message: "user mail not found" });
        console.log("not found");
      }
    })
    .catch((err) => {
      res.send(err);
      res.send({ message: "user not found" });
      console.log({ message: "user not found" });
    });
});

//>>>>>>>>>>>>>>>>  SECTION FOR REGISTER  <<<<<<<<<<<<<<<<<<<<<<

//get geta from link
/*app.post("/register", (req, res) => {
  const { name, email, password, otp } = req.body;

  var newOtp = Math.floor(Math.random() * 1000000);
  console.log(newOtp);

  if (otp == 5671012) {
    //creating user object to fill the schema
    const userObject = new userModel({
      name: name,
      email: email,
      password: password,
    });

    //check for duplicate of email
    userModel
      .findOne({ email: email })
      .then((duplicate) => {
        if (!duplicate) {
          console.log("not present");
          res.send({ message: "successfully created" });

          sendmail(newOtp);

          //.save function to save the data into database
          userObject
            .save()
            .then(() => console.log("succesfully saved"))
            .catch((err) => console.log(err));
        } else {
          console.log("already exist");
          res.send({ message: "already exist" });
        }
      })
      .catch((err) => console.log(err));
  } else {
    res.send({ message: "incorrect OTP" });
  }
});
*/

app.get("/loop", (req, res) => {
  res.send("there is a loop in thhis projeccts");
});

//>>>>>>>>>>>>>>>>>>>> SECTION FOR UPLOADING PRODUCTS <<<<<<<<<<<<<<<<<<<<

const productSchema = mongoose.Schema({
  productName: "string",
  productCategory: "string",
  productDiscription: "string",
  productPrice: "string",
  productImageURL: "string",
});

const productModel = new mongoose.model("productModel", productSchema);

app.post("/UploadProduct", (req, res) => {
  console.log(req.body);

  //fetching data from the data sent by link from uploadproduct page
  const {
    productName,
    productCategory,
    productDiscription,
    productPrice,
    productImageURL,
  } = req.body;

  let newProduct = new productModel({
    //here LHS is for schema and RHS for giving data from user
    productName: productName,
    productCategory: productCategory,
    productDiscription: productDiscription,
    productPrice: productPrice,
    productImageURL: productImageURL,
  });

  newProduct
    .save()
    .then((result) => {
      console.log("sent");
      res.send({ message: "uploaded successfuly" });
    })
    .catch((err) => console.log(err));
});

app.get("/products", (req, res) => {
  //with async i can first push value in list and then sent
  //without this list will be empty await function wait for its completion and then executes
  async function gettingItems() {
    //all the products from the DB will get saved in this var
    //here we use var because we can intial it without assigning anything so coooL
    var items;
    await productModel

      //find fuction get all the items present in DB
      //it is fuction of mongoDB if we use SQL then we have to write SQL query here
      .find()
      .then((res) => {
        items = res;
      })

      .catch((err) => console.log(err));

    //sending items to the frontend
    res.send(items);
  }
  gettingItems();
});

//generate otp link

//creating schema for saving otp and usermail to backend
const otpSchema = new mongoose.Schema({
  email: "string",
  otp: "string",
});

//creating otp model for matching enterd data with scheme and also this is be collection's name
const otpModel = new mongoose.model("otpModel", otpSchema);

app.post("/generateotp", (req, res) => {
  console.log(req.body);
  const newotp = Math.floor(Math.random() * 100000);
  const { name, email, password, otp } = req.body;

  userModel.findOne({ email: email }).then((found) => {
    if (found) {
      console.log("user already exist");
      res.send({ message: "user already exist", isPresent: true });
    } else {
      //if !found save new user to database
      // newUser.save().then((result) => {
      //   console.log("saved");
      // });
      res.send({ message: "Enter OTP" });
    }
  });

  const toSendMail = {
    otp: newotp,
    email: req.body.email,
  };
  // sendmail(toSendMail);

  //creating new instance each time for new user
  const newObj = new otpModel({
    email: req.body.email,
    otp: newotp,
  });

  //saving data into database
  newObj
    .save()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

app.post("/verifyotp", (req, res) => {
  //destructuring values

  const { name, email, password, otp } = req.body;
  console.log(password);
  //searching for otp in data base
  otpModel.findOne({ email: email, otp: otp }).then((found) => {
    if (found) {
      console.log("found");

      //registering new user after verification
      const newUser = new userModel({
        name: name,
        email: email,
        password: password,
      });

      userModel.findOne({ email: email }).then((found) => {
        if (found) {
          console.log("user already exist");
          res.send({ message: "user already exist" });
        } else {
          {
            //if !found save new user to database
            newUser.save().then((result) => {
              console.log("saved");
              res.send({ message: "user registerd successfully" });
            });
          }
        }
      });
    } else {
      console.log("not found");
      res.send({ message: "incorrect otp" });
    }
  });
});


//listen for starting server on port
app.listen(9191, console.log("port started on 9191"));
