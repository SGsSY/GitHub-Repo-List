import React, { FC } from "react";
import ListItem, { ListItemProps } from "./ListItem";

export interface ListProps {
  innerRef: React.RefObject<HTMLDivElement>;
  list: ListItemProps[];
}

const List: FC<ListProps> = (props) => {
  const { innerRef, list } = props;
  return (
    <div id="infinite-scroll-list" className="list">
      {list.map((item) => (
        <ListItem key={item.id} {...item} />
      ))}
      <div id="infinite-scroll-observer-target" ref={innerRef} />
    </div>
  );
};

export default List;
