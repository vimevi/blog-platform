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
  const handleError = (event) => {
    event.target.src = avatar;
  };

  if (typeof image === "string" && image.length > 0) {
    return (
      <img
        src={image}
        alt={style.avatar}
        className={style.avatar}
        onError={handleError}
      />
    );
  } else if (image && image.url && image.url.length > 0) {
    return (
      <img
        src={image.url}
        alt={style.avatar}
        className={style.avatar}
        onError={handleError}
      />
    );
  } else {
    return (
      <img src={avatar} alt="Avatar Placeholder" className={style.avatar} />
    );
  }
};
