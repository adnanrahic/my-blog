module.exports = {
  'secret': process.env.SECRET || require('./.env/dev').SECRET
};