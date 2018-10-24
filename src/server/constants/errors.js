// TODO: remove createError, use Boom instead

export const HTTP_ERROR_400 = {
  error: {
    code: 400,
    message: 'Sorry, Bad Client Request'
  }
};

export const HTTP_ERROR_500 = {
  error: {
    code: 500,
    message: 'Sorry, Server Error'
  }
};

export const createError = (message, code = 400) => ({
  error: {
    code,
    message
  }
});

export const ERR_MSG_HTTP_ERROR_400 = 'Sorry, Bad Client Request';
export const ERR_MSG_HTTP_ERROR_500 = 'Sorry, Server Error';
export const ERR_MSG_EMAIL_PASS_REQUIRED = 'Email or password not provided';
export const ERR_MSG_EMAIL_PASS_NOT_CORRECT = 'Email or password not correct';
export const ERR_MSG_EMAIL_DUPLICATE = 'The email address you have entered is already registered';
