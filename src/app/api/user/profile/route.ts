import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.username) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    if (session.isAdmin) {
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { username: session.username },
            { name: session.username },
            { email: session.username }
          ]
        },
        select: { avatarUrl: true, name: true, username: true, role: true }
      });
      return NextResponse.json({
        success: true,
        data: user || {
          username: session.username,
          name: session.username,
          role: "Admin",
          avatarUrl: null
        }
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: session.username },
          { name: session.username },
          { email: session.username }
        ]
      },
      select: { avatarUrl: true, name: true, username: true, role: true }
    });

    return NextResponse.json({
      success: true,
      data: user || {
        username: session.username,
        name: session.username,
        role: "Team Member",
        avatarUrl: null
      }
    });
  } catch (error) {
    console.error("Profile GET error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.username) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { avatarUrl } = await req.json();

    if (!avatarUrl) {
      return NextResponse.json({ success: false, error: "avatarUrl is required" }, { status: 400 });
    }

    if (session.isAdmin) {
      return NextResponse.json({ success: true, data: { avatarUrl } });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: session.username },
          { name: session.username }
        ]
      }
    });

    if (user) {
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: { avatarUrl }
      });
      return NextResponse.json({ success: true, data: { avatarUrl: updatedUser.avatarUrl } });
    }

    return NextResponse.json({ success: true, data: { avatarUrl } });
  } catch (error) {
    console.error("Profile update failed:", error);
    return NextResponse.json({ success: false, error: "Failed to update profile" }, { status: 500 });
  }
}
