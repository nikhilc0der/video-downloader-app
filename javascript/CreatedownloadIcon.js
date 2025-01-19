const jsCode = `
  // Debug console
  (console = new Object());
console.log = function (...rest) {
  window.ReactNativeWebView.postMessage(
    JSON.stringify({ type: "console", data: [...rest] })
  );
};
console.debug = console.log;
console.info = console.log;
console.warn = console.log;
console.error = console.log;



let regex = new RegExp(
  "https://(www.|in.)*(instagram|dailymotion|vimeo|facebook|threads|tiktok|pinterest|reddit|twitter).(com|net)",
  "g"
);

let domain_extractor = new RegExp(
  "(instagram|dailymotion|vimeo|facebook|threads|tiktok|pinterest|reddit|twitter)"
);

let obj = {
  instagram: "\\/(reel|p|reels|stories)\\/",
  dailymotion: "\\/video\\/",
  vimeo: "\\/\\[0-9]+",
  facebook: "\\/(videos|posts|watch|reel|stories|share)\\\\[0-9]+/",
  threads: "\\/post\\/",
  tiktok: "\\/video\\/",
  reddit: "\\/r\\/",
  pinterest: "\\/(pin|save|pin)\\/",
  twitter: "\\/status\\/",
};

setInterval(myFunctionVideo, 2000);
function myFunctionVideo() {
  let url = window.location.href;
  let complete_domain = url.match(regex);
  if (complete_domain.length) {
    const domainKey = complete_domain[0].match(domain_extractor);
    if (domainKey.length) {
      const validaturl = new RegExp(obj[domainKey[0]], "g");
      const validate = url.match(validaturl);
      if (validate) {
        let currentUrl = null;
        if (domainKey[0] === "twitter") {
          currentUrl = functionTwitter(window.location.href);
        }
        let mainDiv = document.querySelector(".iconArea");
        if (!mainDiv) {
           mainDiv = document.createElement("div");
        }
        mainDiv.classList.add("iconArea");
        mainDiv.style.position = "fixed";
        mainDiv.style.bottom = "100px";
        mainDiv.style.right = "40px";
        mainDiv.style.zIndex = "999999";
        mainDiv.style.width = "70px";
        mainDiv.style.height = "70px";
        mainDiv.style.backgroundColor = "#ef473a";
        mainDiv.style.borderRadius = "100%";
        mainDiv.style.display = "flex";
        mainDiv.style.justifyContent = "center";
        mainDiv.style.boxShadow = "0px 0px 10px #121212";
        const Div = document.createElement("div");
        Div.style.position = "absolute";
        Div.style.top = "-5px";
        Div.style.width = "76px";
        Div.style.height = "76px";
        Div.style.borderWidth = "2px";
        Div.style.borderColor = "#fff";
        Div.style.borderStyle = "solid";
        Div.style.borderRadius = "100%";
        const oneDiv = document.createElement("div");
        oneDiv.style.position = "absolute";
        oneDiv.style.top = "12px";
        oneDiv.style.width = "3px";
        oneDiv.style.height = "30px";
        oneDiv.style.backgroundColor = "white";
        oneDiv.style.zIndex = "10";
        const twoDiv = document.createElement("div");
        twoDiv.style.position = "absolute";
        twoDiv.style.bottom = "0px";
        twoDiv.style.transform = "rotate(-90deg)";
        twoDiv.style.width = "3px";
        twoDiv.style.height = "36px";
        twoDiv.style.backgroundColor = "white";
        twoDiv.style.zIndex = "8";
        twoDiv.style.borderBottomRightRadius = "20px";
        twoDiv.style.borderBottomLeftRadius = "20px";
        const threeDiv = document.createElement("div");
        threeDiv.style.position = "absolute";
        threeDiv.style.bottom = "31px";
        threeDiv.style.transform = "rotate(45deg)";
        threeDiv.style.width = "25px";
        threeDiv.style.zIndex = "9";
        threeDiv.style.height = "25px";
        threeDiv.style.backgroundColor = "white";
        const fourDiv = document.createElement("div");
        fourDiv.style.position = "absolute";
        fourDiv.style.bottom = "37px";
        fourDiv.style.width = "40px";
        fourDiv.style.zIndex = "9";
        fourDiv.style.height = "24px";
        fourDiv.style.backgroundColor = "#ef473a";
        const fiveDiv = document.createElement("div");
        fiveDiv.style.position = "absolute";
        fiveDiv.style.left = "15.7px";
        fiveDiv.style.borderBottomLeftRadius = "20px";
        fiveDiv.style.bottom = "16.4px";
        fiveDiv.style.width = "3px";
        fiveDiv.style.zIndex = "9";
        fiveDiv.style.height = "18px";
        fiveDiv.style.backgroundColor = "white";
        const sixDiv = document.createElement("div");
        sixDiv.style.position = "absolute";
        sixDiv.style.right = "15.7px";
        sixDiv.style.bottom = "16.5px";
        sixDiv.style.width = "3px";
        sixDiv.style.zIndex = "9";
        sixDiv.style.height = "18px";
        sixDiv.style.backgroundColor = "white";
        sixDiv.style.borderBottomRightRadius = "50px";
        mainDiv.appendChild(oneDiv);
        mainDiv.appendChild(twoDiv);
        mainDiv.appendChild(threeDiv);
        mainDiv.appendChild(fourDiv);
        mainDiv.appendChild(fiveDiv);
        mainDiv.appendChild(sixDiv);
        mainDiv.appendChild(Div);
        document.body.appendChild(mainDiv);
        mainDiv.addEventListener("click", () => {
          const url = currentUrl || window.location.href;
          console.log("video", url);
        });
      } else {
        if (document.querySelector(".iconArea")) {
          document.querySelector(".iconArea").remove();
        }
      }
    }
  }
}

function functionTwitter(url) {
  let fullTweetId = new RegExp("currentTweet=[0-9]+", "g");
  let id = new RegExp("[0-9]+", "g");
  let userExtractor = new RegExp("currentTweetUser=[0-9a-zA-Z_]+", "g");
  let tweetId = url.match(fullTweetId);
  let user = url.match(userExtractor);
  let returnUrl = null;
  if (user && tweetId) {
    user = user[0].replace("currentTweetUser=", "");
    tweetId = tweetId[0].match(id);
    if (tweetId && user) {
      returnUrl = "https://twitter.com/" + user + "/status/" + tweetId;
    }
  }
  return returnUrl;
}
`;
export default jsCode;
