import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  NoteListScreen: undefined;
  AddNoteScreen: undefined;
  EditNoteScreen: {note: Note};
  NoteDetailsScreen: {note: Note};
};

export type Client = {
  id: number;
  name: string;
};

export type Category = {
  id: number;
  name: string;
};

export type Note = {
  id: number;
  text: string;
  client?: Client;
  category?: Category;
};
