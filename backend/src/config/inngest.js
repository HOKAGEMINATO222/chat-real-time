import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import { User } from "../models/userModel";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "chat-real-time" });

const syncUser = inngest.createFunction(
  // configuration
  { id: "sync-user" },
  // trigger (event or cron)
  { event: "clerk/user.created" },
  // function
  async ({ event }) => {
    // Log the event data to the Inngest console
    await connectDB();

    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const newUser = {
      clearkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      image: image_url,
    };

    await User.create(newUser);

    console.log("New user created:", newUser);
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();
    const { id } = event.data;
    await User.deleteOne({ clerkId: id });

    await deleteStreamUser(id.toString());
  }
);

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUser, deleteUserFromDB];
