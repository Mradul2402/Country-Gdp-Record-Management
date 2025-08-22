import mongoose from "mongoose";

const gdpSchema = new mongoose.Schema({
  country: { type: String, required: true },
  iso_code: { type: String, required: true },
  year: { type: Number, required: true },
  gdp: { type: Number, required: true },
});

const Gdp = mongoose.model("Gdp", gdpSchema);

export default Gdp;
