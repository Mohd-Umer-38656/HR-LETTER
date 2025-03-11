import { NextResponse } from "next/server";
import db from "@/lib/db";

// Handle CRUD operations in a single route
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM templates");
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: "Database error", details: error }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, category } = await req.json();
    await db.query("INSERT INTO templates (name, category) VALUES (?, ?)", [name, category]);
    return NextResponse.json({ message: "Template added successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Database error", details: error }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { id, name, category } = await req.json();
    await db.query("UPDATE templates SET name = ?, category = ? WHERE id = ?", [name, category, id]);
    return NextResponse.json({ message: "Template updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Database error", details: error }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await db.query("DELETE FROM templates WHERE id = ?", [id]);
    return NextResponse.json({ message: "Template deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Database error", details: error }, { status: 500 });
  }
}
