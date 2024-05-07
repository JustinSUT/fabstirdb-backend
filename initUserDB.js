import OrbitDB from "orbit-db";
import { create } from "ipfs";
import { config } from "dotenv";
config();

/**
 * Initializes the User database.
 * @async
 * @returns {void}
 * @throws {Error} If there is an error while creating the IPFS instance.
 */
export async function initUserDB() {
  const ipfs = await create({
    repo: "./orbitdb/repo",
    config: {
      Addresses: {
        Swarm: [
          "/ip4/0.0.0.0/tcp/4002",
          "/ip4/0.0.0.0/tcp/4003/ws", // Adjust the ports as necessary
        ],
        API: "/ip4/127.0.0.1/tcp/5002",
        Gateway: "/ip4/127.0.0.1/tcp/9090",
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

  const db = await orbitdb.docstore("users", options);
  await db.load();
  console.log("Users Store initialized");

  return db;
}
