function numberToWords(num) {
    if (num < 0 || num > 100) return "Number out of range (1-100)";

    const units = [
    "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
    "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen",
    "eighteen", "nineteen"
    ];
    const tens = [
    "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy",
    "eighty", "ninety"
    ];

    if (num === 100) return "one hundred";
    if (num < 20) return units[num];

    const ten = Math.floor(num / 10);
    const unit = num % 10;
    return tens[ten] + (unit ? "-" + units[unit] : "");
}

export default numberToWords;
