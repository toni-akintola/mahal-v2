import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { UserService } from "@/lib/services/user-service";

// Define the expected webhook event types
type ClerkWebhookEvent = {
  type: string;
  data: {
    id: string;
    email_addresses: Array<{
      email_address: string;
      id: string;
    }>;
    first_name: string | null;
    last_name: string | null;
    image_url: string;
    created_at: number;
    updated_at: number;
  };
};

export async function POST(req: NextRequest) {
  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.text();

  // Get the Clerk webhook secret from environment variables
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: ClerkWebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as ClerkWebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  try {
    switch (eventType) {
      case "user.created":
        await handleUserCreated(evt.data);
        break;
      case "user.updated":
        await handleUserUpdated(evt.data);
        break;
      case "user.deleted":
        // You might want to handle user deletion
        console.log("User deleted:", evt.data.id);
        break;
      default:
        console.log("Unhandled webhook event:", eventType);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

async function handleUserCreated(userData: ClerkWebhookEvent["data"]) {
  try {
    console.log("Creating user from webhook:", userData.id);

    const primaryEmail = userData.email_addresses.find(
      (email) => email.email_address,
    )?.email_address;

    await UserService.createOrGetUser({
      clerkUserId: userData.id,
      email: primaryEmail,
      firstName: userData.first_name || undefined,
      lastName: userData.last_name || undefined,
      imageUrl: userData.image_url,
    });

    console.log("User created successfully:", userData.id);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

async function handleUserUpdated(userData: ClerkWebhookEvent["data"]) {
  try {
    console.log("Updating user from webhook:", userData.id);

    // Check if user exists in our database
    const existingUser = await UserService.getUserByClerkId(userData.id);

    if (!existingUser) {
      // User doesn't exist, create them
      await handleUserCreated(userData);
      return;
    }

    // You can extend this to update user fields if needed
    // For now, we'll just ensure the user exists
    console.log("User update handled:", userData.id);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}
