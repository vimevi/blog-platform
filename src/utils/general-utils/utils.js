export function truncateTextAtWord(text, maxLength = 36) {
  if (text?.length <= maxLength) {
    return text;
  } else {
    const lastSpaceIndex = text?.lastIndexOf(" ", maxLength);
    const truncatedText =
      lastSpaceIndex !== -1
        ? text?.substring(0, lastSpaceIndex)
        : text?.substring(0, maxLength);

    return truncatedText + "...";
  }
}
export const renderProfileImage = (image, style, avatar) => {
  if (typeof image === "string") {
    return <img src={image} alt={style.avatar} className={style.avatar} />;
  } else if (image && image.url) {
    return <img src={image.url} alt={style.avatar} className={style.avatar} />;
  } else {
    return <img src={avatar} alt={style.avatar} className={style.avatar} />;
  }
};
// https://static.productionready.io/images/smiley-cyrus.jpg
