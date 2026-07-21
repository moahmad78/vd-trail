import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.username) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    const user = await prisma.user.findUnique({
      where: { username: session.username },
      select: { avatarUrl: true, name: true, username: true, role: true }
    });
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
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

    const updatedUser = await prisma.user.update({
      where: { username: session.username },
      data: { avatarUrl }
    });

    return NextResponse.json({ success: true, data: { avatarUrl: updatedUser.avatarUrl } });
  } catch (error) {
    console.error("Profile update failed:", error);
    return NextResponse.json({ success: false, error: "Failed to update profile" }, { status: 500 });
  }
}
