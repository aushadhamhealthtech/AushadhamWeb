import { fail, ok } from "@/lib/api-response";
import { sendInvite } from "@/lib/mock-api";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      role?: string;
      department?: string;
      message?: string;
    };

    if (!body.name || !body.email || !body.role || !body.department) {
      return fail("name, email, role and department are required", 400);
    }

    const result = await sendInvite({
      name: body.name,
      email: body.email,
      role: body.role,
      department: body.department,
      message: body.message,
    });

    return ok(result, undefined, 201);
  } catch {
    return fail("Invalid JSON body", 400);
  }
}
