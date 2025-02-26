
export interface Idea {
  id: string;
  title: string;
  description: string;
  votes: number;
  createdAt: string;
  author: {
    name: string;
    id: string;
  };
  comments: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  author: {
    name: string;
    id: string;
  };
  createdAt: string;
}
