import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message, source } = body || {};

    // 1. Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and project message are required." },
        { status: 400 }
      );
    }

    // 2. Anti-XSS Sanitization check
    const hasMaliciousChars = (str) =>
      /<[^>]*>|javascript:|vbscript:|data:text\/html|on\w+\s*=/i.test(str);

    if (
      hasMaliciousChars(name) ||
      hasMaliciousChars(email) ||
      hasMaliciousChars(message) ||
      (phone && hasMaliciousChars(phone))
    ) {
      return NextResponse.json(
        { error: "Malicious payload detected." },
        { status: 403 }
      );
    }

    const rawPhone = phone ? String(phone).trim().slice(0, 40) : "Not provided";

    const leadPayload = {
      timestamp: new Date().toISOString(),
      name: String(name).trim().slice(0, 120),
      email: String(email).trim().slice(0, 160),
      phone: rawPhone,
      service: service ? String(service).trim().slice(0, 100) : "General Inquiry",
      message: String(message).trim().slice(0, 3000),
      source: source ? String(source).slice(0, 200) : "https://uraanlabs.vercel.app",
    };

    console.log("[LEAD_RECEIVED]", JSON.stringify(leadPayload));

    // 3. Google Sheet Webhook Dispatch (Automatic Sync)
    const googleSheetUrl =
      process.env.GOOGLE_SHEET_WEBHOOK_URL ||
      "https://script.google.com/macros/s/AKfycbyU4nGzLD8aYDG9dUpB4gBQU5jhJAkDdl5BvPjhwY8NAQS2jGwubUDwO5UQhhIIUW1o/exec";

    if (googleSheetUrl) {
      try {
        const sheetPayload = {
          ...leadPayload,
          phone: rawPhone.startsWith("+") ? "'" + rawPhone : rawPhone,
        };
        await fetch(googleSheetUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sheetPayload),
          redirect: "follow",
        });
      } catch (sheetErr) {
        console.error("[GOOGLE_SHEET_DISPATCH_ERROR]", sheetErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry recorded successfully.",
      data: {
        name: leadPayload.name,
        service: leadPayload.service,
      },
    });
  } catch (err) {
    console.error("[CONTACT_API_ERROR]", err);
    return NextResponse.json(
      { error: "Internal server error processing inquiry." },
      { status: 500 }
    );
  }
}
