import express from "express";

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();

  router.get("/cells", async (req, res) => {
    // make sure the cell storage file exist
    // if it doesnt exist add in a default list of cells
    // Read file
    // Parse a list of cells out of it
    // Send list of cells back to browser
  });

  router.post("./cells", async (req, res) => {
    // make sure file exist
    // if not, create it
    // take the list of cells from the requesr obj
    // serialize them
    // write the cells into the file
  });
};
