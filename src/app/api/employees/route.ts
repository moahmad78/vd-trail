import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { getSession } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.isAdmin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
    }

    const { name, email, password, role } = await req.json();
    
    if (!email) {
       return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({ 
      where: { email: email.trim().toLowerCase() } 
    });
    
    if (existingUser) {
      return NextResponse.json({ success: false, error: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Generate a fallback PIN since schema requires it
    const fallbackPin = Math.floor(1000 + Math.random() * 9000).toString();

    const newEmployee = await prisma.user.create({
      data: {
        name,
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        pin: fallbackPin,
        role: role || 'Team Member',
        username: name.trim().toLowerCase().replace(/\s+/g, '_') + '_' + Math.floor(Math.random() * 1000)
      }
    });

    return NextResponse.json({ success: true, data: { id: newEmployee.id, email: newEmployee.email, name: newEmployee.name } });
  } catch (error) {
    console.error("Employee creation failed:", error);
    return NextResponse.json({ success: false, error: "Failed to create employee" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session || !session.isAdmin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
    }

    const employees = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        avatarUrl: true,
        status: true,
        role: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
    return NextResponse.json({ success: true, data: employees });
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch employees" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.isAdmin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
    }

    const { id, password, status } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing employee ID" }, { status: 400 });
    }
    
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: { id },
        data: { password: hashedPassword }
      });
      return NextResponse.json({ success: true, message: "Password updated successfully" });
    }

    if (status) {
      await prisma.user.update({
        where: { id },
        data: { status }
      });
      return NextResponse.json({ success: true, message: "Status updated successfully" });
    }

    return NextResponse.json({ success: false, error: "No update parameters provided" }, { status: 400 });
  } catch (error) {
    console.error("Employee update failed:", error);
    return NextResponse.json({ success: false, error: "Failed to update employee" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.isAdmin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing employee ID" }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Employee deletion failed:", error);
    return NextResponse.json({ success: false, error: "Failed to delete employee" }, { status: 500 });
  }
}
