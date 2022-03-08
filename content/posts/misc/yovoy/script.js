function makePalindrome(str) {
  var lhs = str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s/g, '');
  var mid = '';
  if (document.getElementById('oddPalindrome').checked) {
    mid = lhs.slice(-1);
    lhs = lhs.slice(0, -1);
  }
  var rhs = lhs.split("").reverse().join("");
  return lhs + mid + rhs;
}

function generatePalindrome() {
  const text = document.getElementById('text').value;
  document.getElementById('palindrome').value = makePalindrome(text);
}
