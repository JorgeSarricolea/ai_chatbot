import { NextResponse } from "next/server";
import { INITIAL_PROMPT } from "@/app/prompts/initial.prompt";

const COHERE_API_KEY = process.env.COHERE_API_KEY;
const COHERE_API_URL = "https://api.cohere.ai/v1/chat";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const response = await fetch(COHERE_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        model: "command",
        temperature: 0.3,
        max_tokens: 100,
        chat_history: INITIAL_PROMPT,
      }),
    });

    const data = await response.json();

    return NextResponse.json({
      text: {
        message: data.text || "No se pudo obtener una respuesta",
      },
    });
  } catch (error) {
    console.error("Error en la API de Cohere:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
