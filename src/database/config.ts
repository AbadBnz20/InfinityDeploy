import { DataDetails } from "@/interfaces/details-response";
import { MongoClient } from "mongodb";

export const ConnectMongo = async () => {
  try {
    const client = new MongoClient(process.env.DATABASE_URL || "", {
      driverInfo: { name: "langchainjs" },
    });

    const collection = client.db("HotelDB").collection<DataDetails>("Hotels");
    return collection;
  } catch (error) {
    console.log(error)
    throw new Error("Error al conectarse con BD");
  }
};
