var SECRET;
if (process.env.ENV === 'dev') {
  SECRET = require('./.env/dev').SECRET;
} else if (process.env.ENV === 'prod') {
  SECRET = require('./.env/prod').SECRET;
}
module.exports = {
  'secret': process.env.SECRET || SECRET
};