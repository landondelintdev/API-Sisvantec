import { getAllReportsService } from "../services/leaks.service.js";

export const getAllReports = async (req, res) => {
  try {
    const reports = await getAllReportsService();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
