var clicks = 0;

function likeButton(buttonID, db) {
  clicks += 1
  document.getElementById(buttonID).innerHTML = clicks;
  console.log(db)
};