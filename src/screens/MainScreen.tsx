import React from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, store} from '../store';
import {Note} from '../types';
import {useNavigation} from '@react-navigation/native';

const NoteItem = ({item}: {item: Note}) => {
  const navigation = useNavigation();
  return (
    <View style={style.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('NoteScreen', {note: item})}>
        <Text>{item.text}</Text>
        <View style={style.noteContainer}>
          <Text style={style.noteLabels}>{item.category?.name}</Text>
          <Text style={style.noteLabels}>{item.client?.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const MainScreen = () => {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      {notes.length > 0 ? (
        <FlatList
          data={notes}
          renderItem={({item}) => <NoteItem item={item} />}
        />
      ) : (
        <View style={style.emptyMessage}>
          <Text>No notes available</Text>
        </View>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate('NoteScreen')}
        style={style.btn}>
        <Text style={style.btnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  btn: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    paddingRight: 15,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingTop: 5,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
    fontSize: 30,
  },
  emptyMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  noteLabels: {
    color: '#999',
    fontSize: 13,
  },
});

export default MainScreen;
