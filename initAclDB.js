import { create } from "ipfs";
import OrbitDB from "orbit-db";
import Identities from "orbit-db-identity-provider";

/**
 * Initializes the Access Control List (ACL) database.
 * @async
 * @returns {void}
 * @throws {Error} If there is an error while creating the identity, initializing IPFS, creating the OrbitDB instance, or creating the ACL store.
 */
export async function initAclDB() {
  // Create an identity
  const identity = await Identities.createIdentity({
    id: "server", // This can be any string that uniquely identifies the server
    identityKeysPath: "./keys",
  });

  const ipfsOptions = {
    repo: "./orbitdb/acl",
    config: {
      Addresses: {
        Swarm: [
          "/ip4/0.0.0.0/tcp/4005",
          "/ip4/0.0.0.0/tcp/4006/ws", // Ensure these ports are not clashing with other services
        ],
        API: "/ip4/127.0.0.1/tcp/5005",
        Gateway: "/ip4/127.0.0.1/tcp/9091",
      },
    },
  };
  const ipfs = await create(ipfsOptions);
  const orbitdb = await OrbitDB.createInstance(ipfs, { identity: identity });

  const aclStore = await orbitdb.docstore("acl_store", {
    accessController: {
      type: "orbitdb", // Specify the type of access controller to use
      options: {
        write: [identity.publicKey], // Restrict write access to server
      },
    },
  });

  await aclStore.load();
  console.log("ACL Store initialized");

  return aclStore;
}
