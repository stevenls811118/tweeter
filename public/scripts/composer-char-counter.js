
console.log('Load successfully');


// Retrive the form, tweet text, counter
const $tweet = $('#tweet-text');
const $counter = $('#counter');

console.log($tweet, $counter);

// Listen for form submissions

$tweet.on('input', function(event) {
  $counter.empty(); // Clear out the old counter
  let counter = 140 - this.value.length;
  
  if (counter >= 0) { // If exceed 140 character limit, counter should be red
    $counter.append(`<a>${counter}</a>`);
  } else {
    $counter.append(`<a style="color: red">${counter}</a>`);
  }

});


