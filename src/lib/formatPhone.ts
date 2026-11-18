/**
 * Formats a phone number into French standard notation (pairs of 2 digits).
 * Handles raw digits (0777729004 -> 07 77 72 90 04),
 * international prefix (+33777729004 -> 07 77 72 90 04),
 * and standard separators (dots, dashes, spaces).
 */
export function formatFrenchPhone(val?: string | null): string {
    if (!val) return "";
    let cleaned = val.trim();

    // Convert international French prefix +33 or 0033 into standard leading 0
    if (cleaned.startsWith("+33")) {
        cleaned = "0" + cleaned.slice(3).replace(/^0/, "");
    } else if (cleaned.startsWith("0033")) {
        cleaned = "0" + cleaned.slice(4).replace(/^0/, "");
    }

    // Keep only digits
    const digits = cleaned.replace(/\D/g, "");

    let finalDigits = digits;
    // If user pasted 33712345678 without leading +
    if (digits.startsWith("33") && digits.length >= 11) {
        finalDigits = "0" + digits.slice(2);
    }

    // French national numbers have 10 digits starting with 0
    if (finalDigits.startsWith("0")) {
        finalDigits = finalDigits.slice(0, 10);
    } else if (finalDigits.length > 10) {
        finalDigits = finalDigits.slice(0, 15);
    }

    // Group into 2-digit pairs: XX XX XX XX XX
    const groups = finalDigits.match(/.{1,2}/g);
    return groups ? groups.join(" ") : finalDigits;
}
