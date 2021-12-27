import axios from "axios";
import express from "express";
import { v4 as uuidv4 } from "uuid";

import { connection } from "../db/connection";

const router = express.Router();

router.get("/check", (_, res) => {
  res.json({ status: true });
});

router.get("/students", async (req, res) => {
  try {
    let students,
      { search } = req.query;
    if (!search) {
      students = await connection("student");
    } else {
      students = await connection("student")
        .where("name", "like", `%${search}%`)
        .orWhere("email", "like", `%${search}%`)
        .orWhere("phone_number", "like", `${search}`)
        .orWhere("country", "like", `${search}`)
        .orWhere("country_code", "like", `${search}`);
    }
    return res.json(students);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server Error." });
  }
});

router.post("/students", async (req, res) => {
  try {
    const { name, email, phone_number, country_code } = req.body;

    if (!name || !email || !phone_number || !country_code) {
      return res.status(400).json({ message: "input payload is not correct." });
    }

    const { data } = await axios.get(
      `https://restcountries.com/v2/callingcode/${country_code}`
    );

    let country = "NA";

    if (data[0]["name"]) {
      country = data[0]["name"];
    }

    const student = {
      id: uuidv4(),
      name,
      email,
      phone_number,
      country,
      country_code,
    };

    await connection("student").insert(student);

    return res.json(student);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "server error" });
  }
});

export default router;
