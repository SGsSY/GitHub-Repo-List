import React, { FC } from "react";
import ListItem, { ListItemProps } from "./ListItem";

export interface ListProps {
  list: ListItemProps[];
}

const List: FC<ListProps> = (props) => {
  const { list } = props;
  return (
    <div className="list">
      {list.map((item) => (
        <ListItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default List;
