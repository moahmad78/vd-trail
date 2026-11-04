import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { META_CONFIG, testMetaConnection } from "@/lib/metaConversions";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || !session.isAdmin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const token = META_CONFIG.ACCESS_TOKEN;
    const maskedToken =
      token && token.length > 16
        ? `${token.slice(0, 10)}...${token.slice(-6)}`
        : "Configured";

    return NextResponse.json({
      success: true,
      data: {
        datasetId: META_CONFIG.DATASET_ID,
        apiVersion: META_CONFIG.API_VERSION,
        endpoint: `https://graph.facebook.com/${META_CONFIG.API_VERSION}/${META_CONFIG.DATASET_ID}/events`,
        isTokenConfigured: Boolean(token),
        maskedToken,
        status: "Connected & Active",
      },
    });
  } catch (error: any) {
    console.error("Error fetching Meta integration status:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const session = await getSession();
    if (!session || !session.isAdmin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const testResult = await testMetaConnection();

    if (testResult.success) {
      return NextResponse.json({
        success: true,
        message: "Test lead status event successfully posted to Meta!",
        data: testResult.data,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Meta rejected the test event",
          details: testResult.error,
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Error triggering Meta test event:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to trigger test" }, { status: 500 });
  }
}

