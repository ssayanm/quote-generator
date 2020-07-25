const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// show loading spinner
const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

// Hide Loading spinner
const hideLoadingSpinner = () => {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
};

// Get quote from API
const getQuote = async () => {
  showLoadingSpinner();
  const proxyUrl = "https://cors.sayanmukherjee.com/";
  const apiUrl =
    "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const res = await fetch(proxyUrl + apiUrl);
    const data = await res.json();

    //checking author blank
    data.quoteText === " "
      ? (authorText.innerText = "unknown")
      : (authorText.innerText = data.quoteAuthor);

    // reduce font size for long text
    data.quoteText.length > 120
      ? quoteText.classList.add("long-quote")
      : quoteText.classList.remove("long-quote");

    quoteText.innerText = data.quoteText;
    //stop loader show code
    // complete();
    hideLoadingSpinner();
  } catch (error) {
    console.log(error);
    // getQuote();
  }
};

// twitter functions
const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
};

//event listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

//on load
getQuote();
