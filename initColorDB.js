import OrbitDB from "orbit-db";
import { create } from "ipfs";
import { config } from "dotenv";
config();

/**
 * Initializes the Color database.
 * @async
 * @returns {void}
 * @throws {Error} If there is an error while creating the IPFS instance.
 */
export async function initColorDB() {
  const ipfs = await create({
    repo: "./orbitdb/color",
    config: {
      Addresses: {
        Swarm: [
          "/ip4/0.0.0.0/tcp/4004",
          "/ip4/0.0.0.0/tcp/4007/ws", 
        ],
        API: "/ip4/127.0.0.1/tcp/5003",
        Gateway: "/ip4/127.0.0.1/tcp/9092",
      },
    },
    EXPERIMENTAL: {
      pubsub: true,
    },
  });

  const orbitdb = await OrbitDB.createInstance(ipfs);

  const options = {
    accessController: {
      type: "orbitdb",
      options: {
        write: ["*"],
      },
    },
  };

  const colorDb = await orbitdb.docstore("colors", options);
  await colorDb.load();
  console.log("Colors Store initialized");

  return colorDb;
}
