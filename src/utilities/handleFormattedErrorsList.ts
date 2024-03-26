export const handleFormattedListErrors = ({
  errorsList,
}: {
  errorsList: string[] | undefined;
}) => {
  if (!errorsList) {
    return;
  }

  const formattedErrorsList = errorsList?.flatMap((error) => {
    const splitError = error.split('\n');
    const trimmedLines = splitError
      .map((line) => line.trim())
      .filter((line) => line !== '');
    return trimmedLines;
  });

  return formattedErrorsList;
};
