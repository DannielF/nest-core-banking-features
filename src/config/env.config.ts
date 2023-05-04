export const EnvConfig = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  url: process.env.URL_MAMBU,
  user: process.env.SANDBOX_USER,
  password: process.env.SANDBOX_USER_PASSWORD,
  apiKey: process.env.API_KEY,
  loanProductTypeKey: process.env.PRODUCT_TYPE_ENCODED_KEY,
});
