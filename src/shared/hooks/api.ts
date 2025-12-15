const setAuthorizationHeader = async () => {};
const handleToken = async () => {};
const parseErrorResponse = async (error: any) => { //TODO: 타입 수정
  const { response } = error;
  if (response && response.body) {
    const errorBody = await response.json();
    error.message = errorBody.message || error.message;
    error.statusCode = response.status;
    error.errors = errorBody.errors;
  }
  return error;
};
const handleUnauthorized = async () => {};

export {
  setAuthorizationHeader,
  handleToken,
  parseErrorResponse,
  handleUnauthorized,
};