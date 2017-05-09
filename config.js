var SECRET;
if (process.env.PROD !== 1) {
  SECRET = require('./.env/dev').SECRET;
}
module.exports = {
  'secret': process.env.SECRET || SECRET
};