console.log('composer-char-counter.js load successfully');


// Retrive the tweet text, counter
const $tweet = $('#tweet-text');
const $counter = $('#counter');

// Listen for form submissions
$tweet.on('input', function() {
  $counter.empty(); // Clear out the old counter
  let counter = 140 - this.value.length;
  
  if (counter >= 0) { // If exceed 140 character limit, counter turns red
    $counter.append(`<a>${counter}</a>`);
  } else {
    $counter.append(`<a style="color: red">${counter}</a>`);
  }
});


