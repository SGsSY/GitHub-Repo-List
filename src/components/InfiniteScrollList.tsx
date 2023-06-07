import { FC, useEffect, useRef } from "react";
import ListItem, { ListItemProps } from "./ListItem";

export interface ListProps {
  list: ListItemProps[];
  isLoading: boolean;
  scrollCallback: () => void;
  isError: boolean;
  errorCallback: () => void;
}

const List: FC<ListProps> = (props) => {
  const { list, isLoading, scrollCallback, isError, errorCallback } = props;
  const listRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listElement = listRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!listElement) return;
        if (listElement.scrollHeight <= listElement.clientHeight) return;
        if (isLoading) return;
        if (isError) return;
        if (entries[0].isIntersecting) {
          scrollCallback();
        }
      },
      {
        root: listElement,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isLoading, scrollCallback, isError]);

  return (
    <div data-testid="infinite-scroll-list" ref={listRef} className="list">
      {list.map((item) => (
        <ListItem key={`${item.id}${item.name}`} {...item} />
      ))}
      <div data-testid="infinite-scroll-observer-target" ref={targetRef} />
      {isError && (
        <button disabled={isLoading} onClick={errorCallback}>
          載入更多
        </button>
      )}
    </div>
  );
};

export default List;
