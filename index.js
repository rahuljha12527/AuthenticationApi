const express = require("express");
const app = express();
const port = 8000;
const passport = require("passport");
const passportJwt = require("passport-jwt");
const passportjwtStrategy = require("./config/passport-jwt-strategy");
const bodyParser = require("body-parser");

const db = require("./config/mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
// console.log("middleware");done??? hi bro sorry me wo charger laga raha the
//koi nh ya ek second check krte hu
// ha bro proble route ke the kiya ..nh aapne emiddleware sahi se call nh kiya tha.. acha bro ek bs foret password dekhlo bs
//please ....kya dikkat a yr uske controller likha hai maine usme krne kiya hai password update krne backend me

app.use(passport.initialize());
app.use(passport.session());
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error ${err}`);
    return;
  }
  console.log(`Server is running on port:${port}`);
});
