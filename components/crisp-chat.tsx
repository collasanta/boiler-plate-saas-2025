"use client"

import { useEffect } from "react";
import {Crisp} from "crisp-sdk-web"

const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("bc2a181d-6a25-4c35-bef6-94c5f496b6c9")
    }, [])
    return null
}

export default CrispChat;