export interface ItemProps {
  postId: number;
  title: string;
  userName: string;
  postTime: string;
  content: string;
}
export type ListProps = ItemProps[];
export interface ListItemProps {
  list: ListProps;
}
