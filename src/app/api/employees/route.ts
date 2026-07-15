import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
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
    const employees = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true
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
    const { id, password } = await req.json();
    if (!id || !password) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword }
    });

    return NextResponse.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Password reset failed:", error);
    return NextResponse.json({ success: false, error: "Failed to reset password" }, { status: 500 });
  }
}
