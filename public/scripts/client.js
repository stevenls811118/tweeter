/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
console.log('client.js load successfully');

const $form = $('#tweet-form');

const renderTweets = (tweets) => {
  tweets.forEach(tweet => {
    createTweetElement(tweet);
  });
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
  // console.log( $( this ).serialize() );

  $.ajax({
    type: "POST",
    url: `/`,
    data: tweetText,
    success: console.log(`success!`)
  });
});

const loadtweets = () => {
  $.ajax({
    url: `http://localhost:8080/tweets`,
    success: (response) => {
      renderTweets(response);
      console.log(response);
    },
    error: (error) => {
      console.log(error);
    }
  });
};

loadtweets();
