const moongose = require("mongoose");

const db =
  process.env.mongoURI ||
  // "mongodb://Mike:password@localhost:27019/athlete?authSource=admin";
  "mongodb+srv://DreamDevFast:dream.dev1215@cluster0.79xlk.mongodb.net/?retryWrites=true&w=majority";
const Sport = require("../models/Sport");

const connectDB = async () => {
  try {
    await moongose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    Sport.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        Sport.insertMany([
          { label: "Golf" },
          { label: "Tennis" },
          { label: "Cricket" },
          { label: "Basketball" },
          { label: "Baseball" },
          { label: "American Football" },
          { label: "Aquatics" },
          { label: "Archery" },
          { label: "Automobile Racing" },
          { label: "Badminton" },
          { label: "Beach Volleyball" },
          { label: "Bobsleigh" },
          { label: "Body Building" },
          { label: "Boxing" },
          { label: "Cross Country Running" },
          { label: "Cross Country Skiing" },
          { label: "Curling" },
          { label: "Cycling" },
          { label: "Darts" },
          { label: "Decathlon" },
          { label: "Down Hill Skiing" },
          { label: "Equestrianism" },
          { label: "eSports" },
          { label: "Fencing" },
          { label: "Field Hockey" },
          { label: "Figure Skating" },
          { label: "Gymnastics" },
          { label: "Ice Hockey" },
          { label: "Martial Arts" },
          { label: "Mixed Martial Arts" },
          { label: "Modern Pentathlon" },
          { label: "Motorcycle Racing" },
          { label: "Netball" },
          { label: "Polo" },
          { label: "Racquetball" },
          { label: "Rowing" },
          { label: "Rugby" },
          { label: "Sailing" },
          { label: "Softball" },
          { label: "Shooting" },
          { label: "Skateboarding" },
          { label: "Skeet Shooting" },
          { label: "Skeleton" },
          { label: "Snow Boarding" },
          { label: "Soccer (Football)" },
          { label: "Squash" },
          { label: "Surfing" },
          { label: "Swimming" },
          { label: "Track and Field" },
        ])
          .then(() => {
            console.log("Sports data are initialized.");
          })
          .catch(() => {
            console.log("Sports data cannot be initialized.");
          });
      }
    });

    console.log("MongoDb Connected..");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
