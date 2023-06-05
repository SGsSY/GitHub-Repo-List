import { FC } from "react";

export interface ListItemProps {
  id: number;
  name: string;
  author: string;
  description: string;
}

const ListItem: FC<ListItemProps> = (props) => {
  const { name, author, description } = props;
  return (
    <div className="item">
      <div className="item__name">{name}</div>
      <div className="item__author">{author}</div>
      <div className="item__description">{description}</div>
    </div>
  );
};

export default ListItem;
