import { NextRequest, NextResponse } from "next/server"
import manifest from "@/public/manifest.json"

export async function GET(req: NextRequest) {
    let program = req.nextUrl.searchParams.get("program")
    if (!program) {
        return new NextResponse("Program query api url param missing", {status:404})
    }
    try {
        manifest.start_url = `/p/${program}`
        manifest.description = "Seu Diário de Acompanhamento Fitness"
        let newManifest = {...manifest}
        return new NextResponse(JSON.stringify(newManifest), {status:200, headers:{"Content-Type":"application/json"}})
        
    } catch (error) {
        return new NextResponse("Internal Error", {status:500})
    }
}