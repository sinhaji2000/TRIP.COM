const Trip = require("../../../models/tripModel");
const User = require("../../../models/user");

exports.getTrips_api = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "Unauthoriz: User not logged in" });
    }
    const user = await User.findById(req.user.id).populate("trips");

    const trips = user.trips;
    return res.status(200).json({ trips });
  } catch (error) {
    return res.status(500).send("Internal server problem");
  }
};

exports.createTrip_api = async (req, res) => {
  try {
    const { tripTitle, date, expenses, participants } = req.body;
    console.log(tripTitle, date, expenses, participants);

    const userId = req.user._id;

    if (!Array.isArray(expenses) || !Array.isArray(participants)) {
      return res.status(400).send("Expenses and participants must be arrays");
    }

    const trip = await Trip.create({
      tripTitle,
      date,
      expenses: expenses.map((expense) => ({
        title: expense.title,
        amount: expense.amount,
      })),
      participants: participants.map((participant) => ({
        email: participant.email,
        amount: participant.amount,
      })),
      createdBy: req.user._id,
    });

    await User.findByIdAndUpdate(userId, { $push: { trips: trip._id } });
    for (participant of participants) {
      const user = await User.findOne({ email: participant.email });
      if (user) {
        user.trips.push(trip._id);
        await user.save();
      }
    }
    return res.status(201).json({ message: "Trip created successfully", trip });
  } catch (error) {
    return res.status(500, {
      message: "Internal server problem",
    });
  }
};

// exports.createTrip_api = async (req, res) => {
//   try {
//     const { tripTitle, date, expenses, participants } = req.body;

//     // Debugging Console Logs
//     console.log(tripTitle, date, expenses, participants);

//     const userId = req.user._id;

//     // Validate Input
//     if (!Array.isArray(expenses) || !Array.isArray(participants)) {
//       return res
//         .status(400)
//         .json({ message: "Expenses and participants must be arrays" });
//     }

//     // Create Trip
//     const trip = await Trip.create({
//       tripTitle,
//       date,
//       expenses: expenses.map((expense) => ({
//         title: expense.title,
//         amount: expense.amount,
//       })),
//       participants: participants.map((participant) => ({
//         email: participant.email,
//         amount: participant.amount,
//       })),
//       createdBy: userId,
//     });

//     // Update User's Trip List
//     await User.findByIdAndUpdate(userId, { $push: { trips: trip._id } });

//     // Add Trip to Each Participant's User Record
//     for (const participant of participants) {
//       const user = await User.findOne({ email: participant.email });
//       if (user) {
//         user.trips.push(trip._id);
//         await user.save();
//       }
//     }

//     // Send Success Response
//     return res.status(201).json({ message: "Trip created successfully", trip });
//   } catch (error) {
//     console.error("Error creating trip:", error.message);
//     return res.status(500).json({ message: "Internal server problem" });
//   }
// };
