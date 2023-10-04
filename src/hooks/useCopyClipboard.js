import { useState } from "react";
import { useSectionFunctions } from '@/hooks/section-generate-functions/useGenerationFunctions'

export function useCopyClipboard() {
    const [copiedStatus, setCopiedStatus] = useState(false)
    //copiar a senha
    function handleCopyCliboard(valuePass) {
        navigator.clipboard.writeText(valuePass)
        setCopiedStatus(true);
        setTimeout(() => {
            setCopiedStatus(false);
        }, 3 * 1000)
    }

    return { handleCopyCliboard, copiedStatus }
}