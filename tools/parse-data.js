/**
 * modulo parse-data
 * Analiza dados de formulário no aplicativo express manualmente sem  body-parser, devido a body-parse deprecated
 * https://www.geeksforgeeks.org/parsing-form-data-in-express-app-manually-without-body-parser/
 */
const parseData = (req, res, next) => {
  // Middleware function
  if (req.method === "POST") {
    const formData = {};
    req.on("data", (data) => {
      // decode e  parse data
      const parseData = decodeURIComponent(data).split("&");
      for (let data of parseData) {
        decodeData = decodeURIComponent(data.replace(/\+/g, "%20"));
        const [key, value] = decodeData.split("=");
        // Accumulate submitted
        // data in an object
        formData[key] = value;
      }
      // Attach form data in request object
      req.body = formData;
      next();
    });
  } else {
    next();
  }
}
module.exports = parseData;