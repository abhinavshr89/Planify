
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

export async function getOrganization(slug) {
    //* getting the current user id 
    const { userId } = auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    //* checking if the user exists in our database or not
    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) {
        throw new Error("User not found");
    }

    //* getting the organization details using the slug
    const organization = await clerkClient().organizations.getOrganization({
        slug,
    });

    if (!organization) {
        return null;
    }

    //* checking if the user belongs to this organization
    const { data: membership } =
        await clerkClient().organizations.getOrganizationMembershipList({
            organizationId: organization.id,
        });

    //* finding the user's membership in the organization
    const userMembership = membership.find(
        (member) => member.publicUserData.userId === userId
    );

    //* if user is not a member, return null
    if (!userMembership) {
        return null;
    }

    //* returning the organization details
    return organization;
}
