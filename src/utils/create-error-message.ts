/**
 * Create error message
 * @param data dada to create error message
 * @returns error message
 */

export const createErrorMessage = ({
  customMessage,
  error,
}: {
  customMessage: string;
  error: any;
}) => {
  return `${customMessage}
  Message: ${error.message}
  Stack: ${error.stack}
  Data: ${JSON.stringify(error.response?.data)}`;
};
