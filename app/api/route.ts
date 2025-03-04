import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import Papa from "papaparse";

export async function GET() {
  const filePath = path.join(process.cwd(), "files/PLS_FY22_AE_pud22i.csv");
  // console.log("Fielpath: ", filePath);

  try {
    const data = fs.readFileSync(filePath, "utf8");
    // console.log("Data:", data);
    const parsedData = Papa.parse(data, { header: true });
    // console.log("Parsed data:", parsedData);

    if (parsedData.errors.length) {
      return NextResponse.json(
        { error: "Failed to parse CSV file" },
        { status: 500 }
      );
    }

    return NextResponse.json(parsedData.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read CSV file." + error },
      { status: 500 }
    );
  }
}
