// Required modules
const User = require("../models/user");
const { initializeFuse, searchFuse } = require("../config/fuseHelper");
const Trip = require("../models/tripModel");

// Flag to track Fuse.js initialization
let fuseInitialized = false;

// Function to initialize Fuse.js with trips from the database
const initializeFuseWithTrips = async () => {
  try {
    if (!fuseInitialized) {
      const trips = await Trip.find({});

      // Log the trips data to verify structure
      // console.log("Fetched trips from database:", trips);

      // Ensure trips is an array before initializing Fuse
      if (Array.isArray(trips)) {
        initializeFuse(trips);
        fuseInitialized = true;
        // console.log("Fuse.js initialized with trip data.");
      } else {
        throw new Error("Expected an array of trips from the database.");
      }
    }
  } catch (error) {
    console.error("Error initializing Fuse.js:", error);
    throw error;
  }
};

// Controller for the dashboard
exports.getDashboard = async (req, res) => {
  try {
    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
      return res.redirect("/user/signIn");
    }


    const url = "https://open-weather13.p.rapidapi.com/city/delhi/EN";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "f0dccf4aadmsh3f3f10d299207cdp1255bajsnf20d4c509126",
        "x-rapidapi-host": "open-weather13.p.rapidapi.com",
      },
    };

    const response = await fetch(url, options);
    const result = await response.json();

    let c = 0;

    if (result?.main?.temp) {
      let x = result?.main?.temp;
      c = (x - 32) / 1.8;
    }
    // console.log(result?.main?.temp);


    const user = await User.findById(req.user.id).populate("trips");

    // Initialize Fuse.js with trips (if not already initialized)
    await initializeFuseWithTrips();

    // Extract search query from the request (e.g., ?q=Noida)
    const searchQuery = req.query.q;
    let trips = user.trips;

    // Perform search if a query exists
    if (searchQuery) {
      const searchResults = searchFuse(searchQuery); // Perform the search
      trips = searchResults.map((result) => result.item); // Extract matched items
      // console.log(trips, "trips");
    }

    // Render the dashboard with trips (filtered or all)
    return res.render("dashboard", {
      title: "Dashboard",
      user: user,
      trips: trips,
      searchQuery: searchQuery || "", // To retain the search query in the UI

      temp: c,

    });
  } catch (error) {
    console.error("Error fetching dashboard:", error);
    return res.status(500).send("Error in fetching dashboard");
  }
};



// const weather = async () => {
//   const fetch = require("node-fetch");

//   const url = "https://open-weather13.p.rapidapi.com/city/nothing/EN";
//   const options = {
//     method: "GET",
//     headers: {
//       "x-rapidapi-key": "f0dccf4aadmsh3f3f10d299207cdp1255bajsnf20d4c509126",
//       "x-rapidapi-host": "open-weather13.p.rapidapi.com",
//     },
//   };

//   try {
//     const response = await fetch(url, options);
//     const result = await response.json();
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// };

// weather();