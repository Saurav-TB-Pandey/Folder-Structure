import { sequelize } from "../index.js";
import logger from "../../utils/logger/index.js";
import { User } from "../../models/index.js";

export const syncModels = async () => {
  logger.info("Syncing The Database Models.");
  await sequelize.sync({
    alter: true,
    force: false, // set to true to drop tables and recreate them
  });
};
