import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
export const checkUser = async () => {
  const user = await currentUser();
 
  if (!user) {
    return null;
  }

  try {
    const loggedInUser = await db?.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      
      return loggedInUser;
    }

    const name = `${user.firstName} ${user.lastName}`;
    const email = user.emailAddresses?.[0]?.emailAddress || null;

    if (!email) {
      throw new Error("User email address is missing");
    }

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email,
      },
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return null; // Add this line to handle the error properly
  }
};