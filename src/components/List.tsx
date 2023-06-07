import { FC, useEffect, useRef } from "react";
import ListItem, { ListItemProps } from "./ListItem";

export interface ListProps {
  list: ListItemProps[];
  isLoading: boolean;
  scrollCallback: () => void;
}

const List: FC<ListProps> = (props) => {
  const { list, isLoading, scrollCallback } = props;
  const listRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listElement = listRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!listElement) return;
        if (listElement.scrollHeight <= listElement.clientHeight) return;
        if (isLoading) return;
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
  }, [isLoading, scrollCallback]);

  return (
    <div id="infinite-scroll-list" ref={listRef} className="list">
      {list.map((item) => (
        <ListItem key={item.id} {...item} />
      ))}
      <div id="infinite-scroll-observer-target" ref={targetRef} />
    </div>
  );
};

export default List;
