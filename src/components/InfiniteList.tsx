import React from "react";
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import TweetCard, { LoadingCard } from "./TweetCard";
import { Tweet } from "../model";
import styled from "styled-components";

const FullScreen = styled.div`
  width: 100%;
  height: 100vh;
`;

export default function InfiniteList({
  isNextPageLoading,
  items,
  loadNextPage,
}: {
  isNextPageLoading: boolean;
  items: Tweet[];
  loadNextPage: (startIndex: number, stopIndex: number) => Promise<void>;
}) {
  // if the page is already loading pass an empty callback to avoid repeat calls
  const loadMoreItems = isNextPageLoading
    ? () => new Promise(() => {})
    : loadNextPage;

  // if the index has passed the item count then we need to load more
  const isItemLoaded = (index: number) => {
    return !!items[index];
  };

  interface ItemProps {
    index: number;
    style: React.CSSProperties;
  }

  // conditionally render either placeholder cards or the tweets themselves if they're loaded
  const ListItem: React.FC<ItemProps> = ({ index, style }) => {
    if (!isItemLoaded(index) || items[index].loading) {
      return <LoadingCard style={style} />;
    }
    return <TweetCard style={style} {...items[index]} />;
  };

  return (
    <FullScreen>
      <AutoSizer>
        {({ height, width }: { height: number; width: number }) => {
          return (
            <InfiniteLoader
              isItemLoaded={isItemLoaded}
              itemCount={items.length + 1}
              loadMoreItems={loadMoreItems}
            >
              {({ onItemsRendered, ref }) => (
                <FixedSizeList
                  height={height}
                  itemCount={Math.min(items.length + 10, 10000)}
                  itemSize={200}
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                  width={width}
                >
                  {ListItem}
                </FixedSizeList>
              )}
            </InfiniteLoader>
          );
        }}
      </AutoSizer>
    </FullScreen>
  );
}
