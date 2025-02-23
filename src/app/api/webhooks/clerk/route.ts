import { type WebhookEvent } from "@clerk/nextjs/server"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { Webhook } from "svix"
import { env } from "~/env"
import { db } from "~/server/db"

export async function POST(request: Request) {
  const wh = new Webhook(env.CLERK_SIGNING_SECRET)

  const headerPayload = await headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  /* If there are no headers then request is not valid */
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ success: false, message: "Error: Missing Svix headers" })
  }

  const payload = (await request.json()) as Record<string, unknown>
  const body = JSON.stringify(payload)

  let event: WebhookEvent

  /* Verify the webhook */
  try {
    event = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch {
    return NextResponse.json({ success: false, message: "Error: Verification error" })
  }

  switch (event.type) {
    case "user.created": {
      await db.user.create({
        data: {
          clerkId: event.data.id,
        },
      })
      return NextResponse.json({ success: true, message: "User created successfully" })
    }
    default: {
      return NextResponse.json({ success: false, message: "Unhandled event" })
    }
  }
}
