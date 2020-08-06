export function uppercase(string) {
    return string.toUpperCase();
}

export function formatCard(creditCard) {
    return creditCard.replace(/-/g, "");
}