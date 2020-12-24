class Capitalizer {
  capitalize = str => {
    return str
    .split('')
    .map(char => {
      return char.toUpperCase();
    })
    .join('');
  };
}

module.exports = Capitalizer;