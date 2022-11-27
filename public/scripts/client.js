/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
console.log('client.js load successfully');

// Retrive the form, error, and declear error messages
const $form = $('#tweet-form');
const $error = $('#error');
const $noInput = $(`
  <div id="error-message">
    <i class="fa-solid fa-triangle-exclamation"></i>
    <p>You have nothing to tweet!<p>
    <i class="fa-solid fa-triangle-exclamation"></i>
  </div>`);
const $overLimit = $(`
<div id="error-message">
  <i class="fa-solid fa-triangle-exclamation"></i>
  <p>You tweet is too long! Please respect our arbitrary limit of 140 characters!<p>
  <i class="fa-solid fa-triangle-exclamation"></i>
</div>`);

// Render tweets
const renderTweets = (tweets) => {
  for (let i = tweets.length - 1; i >= 0; i--) {
    createTweetElement(tweets[i]);
  }
};

// Escape function to prevent XSS
const escape = (str) => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Create single tweet
const createTweetElement = (tweet) => {
  const $tweetTest = $(`
  <article>
    <header>
      <div>
        <img src=${tweet.user.avatars} alt="Avatar" class="avatar">
        <a>${tweet.user.name}</a>
      </div>
      <a class="atPeople">${tweet.user.handle}</a>
    </header>
    <p>${escape(tweet.content.text)}</p>
    <hr>
    <footer>
      <span>${timeago.format(tweet.created_at)}</span>  
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>                 
    </footer>
  </article>`);
  $('.tweetTest').append($tweetTest);
};

// Form listening function for submission
$form.on('submit', function(event) {
  event.preventDefault(); // Stop the form from loading a new page
  $error.empty(); // Remove the previous error message
  const tweetText = $tweet.val(); //Save the input value to tweetText
  
  // Check if tweet valid
  if (tweetText === '' || tweetText === null) {
    $error.append($noInput);
  } else if (tweetText.length > 140) {
    $error.append($overLimit);
  } else {
    $.ajax({
      type: "POST",
      url: `/tweets`,
      data: {text: tweetText}, // Submit the tweetText in this format to server
      success: () => {
        loadtweets();
        $tweet.val(''); // Clear the input from textarea
        $counter.empty(); // Clear the counter
        $counter.append(`<a>140</a>`); // Reset it back to 140
      }
    });
  }
});

// Using Ajax to get tweets
const loadtweets = () => {
  $.ajax({
    url: `http://localhost:8080/tweets`,
    success: (response) => {
      $('.tweetTest').empty(); // Remove previous loading tweets
      renderTweets(response);
    },
    error: (error) => {
      console.log(error);
    }
  });
};

// Form slide out and hide feature
$("#display-form").click(function() {
  if ($("#tweet-form").first().is(":hidden")) {
    $("#tweet-form").slideDown("slow");
    $tweet.focus(); // Focus cursor to the textarea
  } else {
    $("#tweet-form").hide();
  }
});

loadtweets(); // Load tweets when refresh the page
