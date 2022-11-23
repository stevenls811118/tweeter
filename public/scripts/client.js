/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
console.log('client.js load successfully');

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = (tweets) => {
  tweets.forEach(tweet => {
    createTweetElement(tweet);
  });
}

const createTweetElement = (tweet) => {
  const $tweetTest = $(`<article>
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
      <span>10 days ago</span>
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>                 
    </footer>
  </article>`);
  $('.tweetTest').append($tweetTest);
}

renderTweets(data);