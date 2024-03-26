export const useResetErrors = ({
  setErrors,
}: {
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const resetErrors = () => {
    setErrors([]);
  };

  return resetErrors;
};
