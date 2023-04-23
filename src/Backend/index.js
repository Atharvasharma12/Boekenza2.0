//for seller Registration
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const sendmail = require("./SendMail");
// const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { upload } = require("@testing-library/user-event/dist/upload");

// const sendmail = require("./SendMail");

//creating app
const app = express();
// console.log(bcrypt("hello", 10));
//for sending res and req we use these
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//mongodb://0.0.0.0:27017/BokenzaDB
//connection with mongo db

mongoose
  .connect(process.env.MONGO_ATLAS_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"))
  .catch((err) => {
    console.log("unable to connect to DB  ", err);
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



const middleware = (req, res, next) => {
  console.log("middleware");

  next();
};

app.get("/LoginPage", (req, res) => {
  console.log(req.body);
});

app.post("/LoginPage", (req, res) => {
  const { email, password } = req.body;
  // console.log(email);
  userModel
    //findOne is query of mongo use to find atleast 1 document and return
    .findOne({ email: email })
    .then((foundUser) => {
      if (foundUser) {
        if (password === foundUser.password) {
          console.log("user and password found");
          //sending message and details of user which is later use for whether login or not

          productModel
            .find({ SellerEmailID: email })
            .then((userItems) => {
              if (userItems) {
                res.send({
                  message: "user login success",
                  user: foundUser,
                  userItems: userItems,
                });
              } else {
                console.log("user item not found");
              }
            })
            .catch((err) => console.log(err));
        } else {
          console.log("password not matched");
          res.send({ message: "password not matched", notFound: "password" });
        }
      } else {
        res.send({ message: "user mail not found", notFound: "mail" });
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
  SellerName: "string",
  SellerEmailID: "string",
  productUploadDate: "string",
  productExpiryDate: "string",
});

const productModel = new mongoose.model("productModel", productSchema);

const uploadMiddelware = (req, res, next) => {
  // console.log(req.body);
  //to check if user is present or not
  if (req.body.name && req.body.email) {
    // res.send({message : "user is logged in"})
    next();
  } else {
    res.send({ message: "user is not logged in" });
  }
};

app.post("/UploadProduct", uploadMiddelware, (req, res) => {
  //fetching data from the data sent by link from uploadproduct page
  //saving the date of uploading
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDate = new Date().getDate();
  const currenthours = new Date().getHours();
  const currentMinuts = new Date().getMinutes();
  const currentSeconds = new Date().getSeconds();
  const expiryDate =
    new Date(
      `${
        currentMonth + 1
      } ${currentDate} ${currentYear}, ${currenthours}:${currentMinuts}:${currentSeconds}`
    ).getTime() +
    10 * 24 * 60 * 60 * 1000;
  console.log(currentDate);
  const {
    productName,
    productCategory,
    productDiscription,
    productPrice,
    productImageURL,
  } = req.body.productDetail;
  const name = req.body.name;
  const email = req.body.email;
  let newProduct = new productModel({
    //here LHS is for schema and RHS for reciving data from user
    productName: productName,
    productCategory: productCategory,
    productDiscription: productDiscription,
    productPrice: productPrice,
    productImageURL: productImageURL,
    SellerName: name,
    SellerEmailID: email,
    productUploadDate: new Date().getTime(),
    productExpiryDate: expiryDate,
  });
  console.log(newProduct);

  newProduct
    .save()
    .then((result) => {
      console.log("sent");

      res.send({ message: "uploaded successfuly", productId: result._id });
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
    //find fuction get all the items present in DB
    //it is fuction of mongoDB if we use SQL then we have to write SQL query here
    await productModel
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
  //sending mail function

  async function sendmail(toSendMail) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      // port: 587,
      auth: {
        user: "boekenza@gmail.com",
        pass: "gkpvarzplcquafax",
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "boekenza@gmail.com", // sender address
      to: `${req.body.email}`, // list of receivers
      subject: "Registration verification", // Subject line
      text: `otp for verification is ${newotp}`, // plain text body
      // html: "<b> otp for verification is {otp} </b>", // html body
    });
  
    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
  sendmail().catch(console.error);
  

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

//>>>>>>>>>>>>>>>>>>>> SECTION FOR BYUER <<<<<<<<<<<<<<<<<<<<

//middleware will check whether user is login
const buyerPageMiddleware = (req, res, next) => {
  const { name, email, _id, isPresent } = req.body;

  if (name && email && _id && isPresent == true) {
    next();
  } else {
    console.log("user is not present and cannot buy product");
    res.send({ message: "user not logged in" });
  }
};

app.post("/buyerPage", buyerPageMiddleware, (req, res) => {
  console.log(req.body);
  const { name, email, _id, isPresent } = req.body;

  const {
    productName,
    productCategory,
    productDiscription,
    productPrice,
    productImageURL,
  } = req.body.buyersProduct;

  productModel
    .findOne({ productImageURL: productImageURL })
    .then((found) => {
      if (found) {
        console.log(found);
        const SellerEmailID = found.SellerEmailID;

        //searching for product in backend and seeking information about the seller from product information

        async function sendmail() {
          let testAccount = await nodemailer.createTestAccount();
          const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            // port: 587,
            auth: {
              user: process.env.USER_NAME,
              pass: process.env.PASSWORD,
            },
          });

          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: process.env.USER_NAME, // sender address
            to: `${SellerEmailID}`, // list of receivers
            subject: "Buyer from Boekenza", // Subject line
            text: `Hello dear seller, we have found buyer for your product.
          PRODUCT NAME : ${productName} 
          CATEGORY :  ${productCategory} 
          DISCRIPITON : ${productDiscription}
          PRICE : Rs.${productPrice}/-
          IMAGE- ${productImageURL}

          Buyer's Information - 
          Name : ${name}
          Email : ${email}`, // plain text body
          });

          console.log("mail send");
          res.send({ message: "Notification sent to Seller" });
        }

        sendmail().catch(console.error);
      }
    })
    .catch((err) => console.log(err));
});




//listen for starting server on port
app.listen(
  process.env.BACKEND_PORT,
  console.log(`port started on ${process.env.BACKEND_PORT}`)
);
