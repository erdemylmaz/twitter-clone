// trends

// const trends = JSON.parse(trendsData); comment that while upload site to internet
let trends = [{name: "#cumartesi", tweetCount: "2,131"}, {name: "#128MilyarDolar", tweetCount: "28K"}, {name: "#yasak", tweetCount: "19.4K"}, {name: "#ParaNerede", tweetCount: "12.6K"}, {name: "#SinavlariIptalEt", tweetCount: "3.4M"}];

const trendsDOM = document.querySelector('.right-section-container');
// tweets
const tweetsDOM = document.querySelector('.tweets');

// let tweets = JSON.parse(tweetsData); comment that while upload site to internet
let tweets = [{author: "Erdem Yilmaz", username: "erdemyilmazx", text: "Hello World!", date: "24.04.2021", profileImg: "./image/profile-picture.png"}, {author: "Erdem Yilmaz", username: "erdemyilmazx", text: "Welcome to Twitter Clone, Made by Erdem", date: "24.04.2021", profileImg: "./image/profile-picture.png"}, {author: "Elon Musk", username: "elonmusk", text: "Congratulations!", date: "24.04.2021", profileImg: "./image/elon-musk-pp.jpeg"}];

if(localStorage.getItem('tweets')) {
    tweets = JSON.parse(localStorage.getItem('tweets'));
}

// search bar
const searchInput = document.querySelector('.search-input');
const clearBtn = document.querySelector('.clear-button');
const searchDiv = document.querySelector('.search-div');
const searchIcon = document.querySelector('.search-icon');

search = () => {
    if(searchInput.value.length > 0) {
        clearBtn.style.display = "inline-flex";
        searchDiv.style.border = "1px solid var(--blue)";
        searchIcon.style.color = "var(--blue)";
    } else {
        searchDiv.style.border = "none";
        clearBtn.style.display = "none";
        searchIcon.style.color = "#676f76";
    }

    let tweetTexts = document.querySelectorAll('.tweet-text');
    let searchText = searchInput.value.toLowerCase();

    Array.from(tweetTexts).forEach((text) => {
        if(text.textContent.toLowerCase().indexOf(searchText) != -1) {
            text.parentNode.parentNode.style.display = "block";
        } else {
            text.parentNode.parentNode.style.display = "none";
        }
    });

}

searchInput.addEventListener('keyup', search);
clearBtn.addEventListener('click', () => {
    searchInput.value = "";
    searchDiv.style.border = "none";
    clearBtn.style.display = "none";
    searchIcon.style.color = "#676f76";

    let allTweets = document.querySelectorAll('.user-tweet');

    Array.from(allTweets).forEach((tweet) => {
        tweet.style.display = "block";
    })

});

// add tweet
const tweetBtn = document.querySelector('.tweet-button');
const tweetInput = document.querySelector('.tweet-input');
const tweetValueDOM = document.querySelector('.tweetValue');

let author = "Erdem Yilmaz";
let username = "erdemyilmazx";
let profileImg = "./image/profile-picture.png";

addExtraZero = (x) => {
    return x < 10 ? "0" + x : x;
}

addTweet = () => {
    let d = new Date();

    let day = addExtraZero(d.getDate());
    let month = addExtraZero(d.getMonth() + 1);
    let year = addExtraZero(d.getFullYear());

    let date = [day, month, year].join('.');

    let tweetText = tweetInput.value;

    tweets.push(
        {
            author: author,
            username: username,
            text: tweetText,
            profileImg: profileImg,
            date: date,
        }
    );

    localStorage.setItem('tweets', JSON.stringify(tweets));

    let div = document.createElement('div');
    div.className = "user-tweet";

    div.innerHTML = `
        <hr class="tweet-hr">
        <div class="user-tweet-header">
            <a href="https://www.twitter.com/erdemyilmazx" class="tweet-image-link"><img src=${profileImg} style="width: 48px; height: 48px;"></a>

            <div class="user-tweet-info">
                <a href="https://www.twitter.com/erdemyilmazx" class="tweet-name">${author}</a>
                <span class="tweet-username">@${username}</span>
                <span class="date">${date}</span> 
            </div>

        </div>

        <div class="tweet-section">
            <span class="tweet-text">${tweetText}</span>
        </div>

        <div class="user-tweet-footer">
            <div class="tweet-footer-item comment"><i class="far fa-comment"></i>0</div>
            <div class="tweet-footer-item retweet"><i class="fas fa-retweet"></i>0</div>
            <div class="tweet-footer-item heart"><i class="far fa-heart"></i>0</div>
            <div class="tweet-footer-item share"><i class="fas fa-share"></i></div>
            <i class="far fa-trash-alt delete tweet-footer-item"></i>
        </div>
    `;

    tweetsDOM.prepend(div);

    tweetInput.value = "";
    tweetValueDOM.textContent = `0 / 240`;
    tweetBtn.disabled = true;
    tweetBtn.style.filter = "brightness(0.7)";

    console.log(tweets);
}

tweetInput.addEventListener('keyup', (e) => {
    if(tweetInput.value.length > 0) {
        tweetBtn.disabled = false;
        tweetBtn.style.filter = "none";
    } else {
        tweetBtn.disabled = true;
        tweetBtn.style.filter = "brightness(0.7)"; 
    }

    if(e.keyCode == 13) {
        addTweet();
    }

    tweetValueDOM.innerHTML = `${tweetInput.value.length} / 240`;
});

tweetBtn.addEventListener('click', addTweet);

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
                <a href="https://www.twitter.com/erdemyilmazx" class="tweet-image-link"><img src=${tweet.profileImg} style="width: 48px; height: 48px; border-radius: 50%;"></a>

                <div class="user-tweet-info"> 
                    <a href="https://www.twitter.com/erdemyilmazx" class="tweet-name">${tweet.author}</a>
                    <span class="tweet-username">@${tweet.username}</span>
                    <span class="date">${tweet.date}</span>
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

        if(i > 2) {
            div.innerHTML = `
                <hr class="tweet-hr">
                <div class="user-tweet-header">
                    <a href="https://www.twitter.com/erdemyilmazx" class="tweet-image-link"><img src=${tweet.profileImg} style="width: 48px; height: 48px; border-radius: 50%;"></a>

                    <div class="user-tweet-info">
                        <a href="https://www.twitter.com/erdemyilmazx" class="tweet-name">${tweet.author}</a>
                        <span class="tweet-username">@${tweet.username}</span>
                        <span class="date">${tweet.date}</span> 
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
                    <i class="far fa-trash-alt delete tweet-footer-item"></i>
                </div> 
            `;
        }

        tweetsDOM.prepend(div);
    }

}

// delete tweet
tweetsDOM.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete')) {
        let deletedTweet = e.target.parentNode.parentNode;
        let deletedText = e.target.parentNode.previousElementSibling.firstElementChild.textContent;
        tweetsDOM.removeChild(deletedTweet);

        for(let x = 0; x < tweets.length; x++) {
            if(tweets[x].text == deletedText) {
                let tweets = JSON.parse(localStorage.getItem('tweets'));
                tweets.splice(x, 1);

                localStorage.setItem('tweets', JSON.stringify(tweets));
            }
        }
    }
})

window.addEventListener('load', init);