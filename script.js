// trends
const trends = JSON.parse(trendsData);
const trendsDOM = document.querySelector('.right-section-container');
// tweets
const tweetsDOM = document.querySelector('.tweets');

let tweets = JSON.parse(tweetsData);

// search bar
const searchInput = document.querySelector('.search-input');
const clearBtn = document.querySelector('.clear-button');
const searchDiv = document.querySelector('.search-div');
const searchIcon = document.querySelector('.search-icon');

styleSearchDiv = () => {
    if(searchInput.value.length > 0) {
        clearBtn.style.display = "inline-flex";
        searchDiv.style.border = "1px solid var(--blue)";
        searchIcon.style.color = "var(--blue)";
    } else {
        searchDiv.style.border = "none";
        clearBtn.style.display = "none";
        searchIcon.style.color = "#676f76";
    }
}

searchInput.addEventListener('keyup', styleSearchDiv);
clearBtn.addEventListener('click', () => {
    searchInput.value = "";
    searchDiv.style.border = "none";
    clearBtn.style.display = "none";
    searchIcon.style.color = "#676f76";
});

// add tweet
const tweetBtn = document.querySelector('.tweet-button');
const tweetInput = document.querySelector('.tweet-input');
const tweetValueDOM = document.querySelector('.tweetValue');

let name = "Erdem Yilmaz";
let username = "erdemyilmazx";
let profileImg = "./image/profile-picture.png";

tweetInput.addEventListener('keyup', () => {
    if(tweetInput.value.length > 0) {
        tweetBtn.disabled = false;
        tweetBtn.style.filter = "none";
    } else {
        tweetBtn.disabled = true;
        tweetBtn.style.filter = "brightness(0.7)"; 
    }

    tweetValueDOM.innerHTML = `${tweetInput.value.length} / 240`;
})

// init
init = () => {
    // init trends
    for(let x = 0; x < trends.length; x++) {
        let div = document.createElement('div');
        div.className = "right-menu-item";

        div.innerHTML = `
            <div class="right-item-header"><div class="right-item-trend" style="width: 50px; display: inline;">${x + 1} · Trending </div> <div class="right-item-more"><i class="fas fa-ellipsis-h"></i></div></div>
            <div class="right-item-container">${trends[x].name}</div>
            <div class="right-item-footer">${trends[x].tweetCount} Tweets</div>
        `;

        let hr = document.createElement('hr');
        hr.className = "right-hr";

        trendsDOM.appendChild(div);
        trendsDOM.appendChild(hr);
    }

    // init tweets
    for(let i = 0; i < tweets.length; i++) {
        let tweet = tweets[i]; 

        let div = document.createElement('div');
        div.className = "user-tweet";

        div.innerHTML = `
            <hr class="tweet-hr">
            <div class="user-tweet-header">
                <a href="https://www.twitter.com/erdemyilmazx" class="tweet-image-link"><img src="./image/profile-picture.png" style="width: 48px; height: 48px;"></a>

                <div class="user-tweet-info">
                    <a href="https://www.twitter.com/erdemyilmazx" class="tweet-name">${tweet.author}</a>
                    <br>
                    <span class="tweet-username">@${tweet.username}</span>
                </div>

            </div>

            <div class="tweet-section">
                <span class="tweet-text">${tweet.text}</span>
            </div>

            <div class="user-tweet-footer">
                <div class="tweet-footer-item comment"><i class="far fa-comment"></i>0</div>
                <div class="tweet-footer-item retweet"><i class="fas fa-retweet"></i>0</div>
                <div class="tweet-footer-item heart"><i class="far fa-heart"></i>0</div>
                <div class="tweet-footer-item share"><i class="fas fa-share"></i></div>
            </div>
        `;

        tweetsDOM.prepend(div);

    }
}

window.addEventListener('load', init);