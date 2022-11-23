/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
console.log('client.js load successfully');

const $form = $('#tweet-form');
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
    "created_at": 1668927272016
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1669013672016
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
      <span>${timeDif(tweet.created_at)}</span>
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>                 
    </footer>
  </article>`);
  $('.tweetTest').append($tweetTest);
}

const timeDif = (timestamp) => {
  let now = Date.now();
  let onDayInMs = 1000 * 60 * 60 * 24;
  let difInDays = (now - timestamp)/ onDayInMs;
  let difInMonths = 0;

  if (difInDays < 1) {
    return `Recent`;
  } else if (difInDays < 2 && difInDays >= 1) {
    return `1 day ago`;
  } else if (difInDays <= 31 && difInDays >= 2) {
    return `${Math.floor(difInDays)} days ago`;
  } else {
    difInMonths = Math.floor(difInDays / 30);
    if (difInMonths <= 12) {
      return `${difInMonths} months ago`;
    } else {
      return `${Math.floor(difInMonths / 12)} years ago`;
    }
  }  
};

$form.on('submit', function(event) {
  event.preventDefault(); // Stop the form from loading a new page

  const tweetText = $tweet.val();
  console.log(this);
  console.log( $( this ).serialize() );

  $.ajax({
    type: "POST",
    url: `/`,
    data: tweetText,
    success: console.log(`success!`)
  });
});

renderTweets(data);