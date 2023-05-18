export const parser = (response: string) => {
  //   const response: string = "<p>test</p>";

  const parser: DOMParser = new DOMParser();
  const htmlDoc: Document = parser.parseFromString(response, "text/html");

  const pTag: Element | null = htmlDoc.querySelector("p");
  if (pTag !== null) {
    const textContent: string | null = pTag.textContent;
    return textContent;
  } else {
    console.error("Could not find <p> element");
  }
};

export const convertSecondToDate = (duration: number) => {
  const dateTime = new Date(duration);
  const month = String(dateTime.getMonth() + 1).padStart(2, "0");
  const date = String(dateTime.getDate()).padStart(2, "0");

  return date + "/" + month + "/" + dateTime.getFullYear();
};

