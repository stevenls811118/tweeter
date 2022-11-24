/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
console.log('client.js load successfully');

const $form = $('#tweet-form');

const renderTweets = (tweets) => {
  for (let i = tweets.length - 1; i >= 0; i--) {
    createTweetElement(tweets[i]);
  }
};

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
    <p>${tweet.content.text}</p>
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

$form.on('submit', function(event) {
  event.preventDefault(); // Stop the form from loading a new page

  const tweetText = $tweet.val();

  if (tweetText === '') {
    alert(`You have nothing to tweet!`);
  } else if (tweetText.length > 140) {
    alert(`Your tweet is too long!`);
  } else {
    $.ajax({
      type: "POST",
      url: `/tweets`,
      data: {text: tweetText},
      success: () => {
        loadtweets();
      }
    });
  }  
});

const loadtweets = () => {
  $.ajax({
    url: `http://localhost:8080/tweets`,
    success: (response) => {
      $('.tweetTest').empty();
      renderTweets(response);
    },
    error: (error) => {
      console.log(error);
    }
  });
};

loadtweets();
