export function truncateTextAtWord(text, maxLength = 36) {
	if (text.length <= maxLength) {
		return text;
	} else {
		const lastSpaceIndex = text.lastIndexOf(' ', maxLength);
		const truncatedText =
			lastSpaceIndex !== -1
				? text.substring(0, lastSpaceIndex)
				: text.substring(0, maxLength);

		return truncatedText + '...';
	}
}
