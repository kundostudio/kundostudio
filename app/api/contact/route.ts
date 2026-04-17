import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactBody = {
	name: string;
	email: string;
	company: string;
	website?: string;
	services: string[];
	details?: string;
	budget: string;
	stage: string;
};

export async function POST(request: Request) {
	try {
		const body = (await request.json()) as ContactBody;

		// Validation
		const missing: string[] = [];
		if (!body.name?.trim()) missing.push("name");
		if (!body.email?.trim()) missing.push("email");
		if (!body.company?.trim()) missing.push("company");
		if (!body.services?.length) missing.push("services");
		if (!body.budget?.trim()) missing.push("budget");
		if (!body.stage?.trim()) missing.push("stage");

		if (missing.length > 0) {
			return NextResponse.json(
				{ error: `Missing required fields: ${missing.join(", ")}` },
				{ status: 400 },
			);
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(body.email)) {
			return NextResponse.json(
				{ error: "Invalid email address" },
				{ status: 400 },
			);
		}

		const services = body.services.join(", ");

		const { error } = await resend.emails.send({
			from: "Kundo Website <website@kundo.studio>",
			to: "hello@kundo.studio",
			replyTo: body.email,
			subject: `New project inquiry from ${body.company}`,
			html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#0a0a0a; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a; padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#111111; border-radius:12px; overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="padding:32px 32px 24px; border-bottom:1px solid rgba(255,255,255,0.08);">
              <p style="margin:0; font-size:13px; color:#9DA1A9; text-transform:uppercase; letter-spacing:0.5px;">New Project Inquiry</p>
              <h1 style="margin:8px 0 0; font-size:22px; font-weight:600; color:#ffffff;">${body.company}</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:24px 32px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${row("Name", body.name)}
                ${row("Email", `<a href="mailto:${body.email}" style="color:#7B8AF9; text-decoration:none;">${body.email}</a>`)}
                ${row("Company", body.company)}
                ${body.website ? row("Website", `<a href="${body.website.startsWith("http") ? body.website : `https://${body.website}`}" style="color:#7B8AF9; text-decoration:none;">${body.website}</a>`) : ""}
                ${row("Services", services)}
                ${body.details ? row("Project Details", body.details) : ""}
                ${row("Budget", body.budget)}
                ${row("Company Stage", body.stage)}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px; border-top:1px solid rgba(255,255,255,0.08); text-align:center;">
              <p style="margin:0; font-size:12px; color:#9DA1A9;">
                Reply directly to this email to respond to ${body.name}.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
		});

		if (error) {
			console.error("Resend error:", error);
			return NextResponse.json(
				{ error: "Failed to send email. Please try again." },
				{ status: 500 },
			);
		}

		try {
			await fetch(`${process.env.FORMA_WEBHOOK_URL}/api/webhooks/inquiry`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-webhook-secret": process.env.FORMA_WEBHOOK_SECRET!,
				},
				body: JSON.stringify({
					name: body.name,
					email: body.email,
					company: body.company,
					website: body.website ?? null,
					lookingFor: body.services,
					notes: body.details ?? null,
					budget: body.budget,
					stage: body.stage,
				}),
			});
		} catch (err) {
			console.error("Forma webhook failed:", err);
		}

		return NextResponse.json({ success: true });
	} catch (err) {
		console.error("Contact API error:", err);
		return NextResponse.json(
			{ error: "Something went wrong. Please try again." },
			{ status: 500 },
		);
	}
}

function row(label: string, value: string) {
	return `
    <tr>
      <td style="padding:10px 0; vertical-align:top;">
        <p style="margin:0 0 2px; font-size:12px; font-weight:500; color:#9DA1A9; text-transform:uppercase; letter-spacing:0.3px;">${label}</p>
        <p style="margin:0; font-size:15px; color:#ffffff; line-height:1.5; white-space:pre-wrap;">${value}</p>
      </td>
    </tr>`;
}
