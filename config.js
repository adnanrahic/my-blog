var SECRET;
if (!process.env.PROD) {
  SECRET = require('./.env/dev').SECRET;
}
module.exports = {
  'secret': process.env.SECRET || SECRET
};