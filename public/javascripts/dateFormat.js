
 function dateFormat(dateString) {
  const date = new Date(dateString)
  return date.getDay()
}

module.exports = dateFormat();
