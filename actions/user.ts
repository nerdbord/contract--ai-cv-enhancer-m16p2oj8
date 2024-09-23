import { clerk } from "lib/clerk";
import { prisma } from "lib/prisma";

export async function createUserFromClerk(clerkUserId: string) {
  const clerkUser = await clerk.users.getUser(clerkUserId);
  const email = clerkUser.emailAddresses?.[0]?.emailAddress || "";

  const user = await prisma.user.upsert({
    where: { clerkId: clerkUserId },
    update: {},
    create: {
      email,
      clerkId: clerkUserId,
    },
  });

  return user;
}
