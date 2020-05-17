import ReactDOM from "react-dom";
import React, { useState } from "react";
import InfiniteList from "./components/InfiniteList";
import { loadOldTweets, loadInitialTweets } from "./api";
import { Tweet } from "./model";

const App = () => {
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [items, setItems] = useState([] as Tweet[]);

  // this callback is called when the infinite loader needs more items
  const loadNextPage = () => {
    setIsNextPageLoading(true);
    // if we already have tweets, load some older tweets to add to the list
    if (items.length > 0) {
      return loadOldTweets(items, setItems, setIsNextPageLoading);
    } else {
      // if we have no tweets, load the latest tweets and start looping calls for more
      return loadInitialTweets(setItems, setIsNextPageLoading);
    }
  };

  return (
    <InfiniteList
      isNextPageLoading={isNextPageLoading}
      items={items}
      loadNextPage={loadNextPage}
    />
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
