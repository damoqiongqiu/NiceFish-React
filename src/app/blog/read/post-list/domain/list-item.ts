export interface ItemProps {
  postId: number;
  title: string;
  userName: string;
  postTime: string;
  content: string;
  userId: string;
  readTimes: string;
  commentTimes: string;
  likedTimes: string;
  isFamous: string;
}
export type ListProps = ItemProps[];
export interface ListItemProps {
  list: ListProps;
}
