import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addNote, editNote, deleteNote} from '../store/notesSlice';
import {Note} from '../types';
import clientsData from '../data/clients.json';
import categoriesData from '../data/categories.json';
import {useNavigation, useRoute} from '@react-navigation/native';

const NoteScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [selectedClientId, setSelectedClientId] = useState<number | undefined>(
    undefined,
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >(undefined);
  const dispatch = useDispatch();

  const isEditMode = route.params?.note;
  const noteToEdit = isEditMode ? (route.params?.note as Note) : null;

  const [error, setError] = useState('');

  const validateInput = () => {
    if (!text.trim()) {
      return 'Please enter note text.';
    }
    if (selectedClientId === undefined || selectedClientId === null) {
      return 'Please select a client.';
    }
    if (selectedCategoryId === undefined || selectedCategoryId === null) {
      return 'Please select a category.';
    }
    return '';
  };

  const handleSubmit = () => {
    const validationError = validateInput();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');

    const noteData = {
      id: isEditMode ? noteToEdit.id : Date.now(),
      text,
      client: clientsData.find(client => client.id === selectedClientId),
      category: categoriesData.find(
        category => category.id === selectedCategoryId,
      ),
    };
    console.log(noteData);
    if (isEditMode) {
      dispatch(editNote(noteData));
    } else {
      dispatch(addNote(noteData));
    }

    navigation.goBack();
  };

  const handleDelete = () => {
    if (isEditMode && noteToEdit) {
      Alert.alert(
        'Delete Note',
        'Are you sure you want to delete this note?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              dispatch(deleteNote(noteToEdit.id));
              navigation.goBack();
            },
          },
        ],
        {cancelable: false},
      );
    }
  };

  useEffect(() => {
    if (isEditMode) {
      setText(noteToEdit?.text || '');
      setSelectedClientId(noteToEdit?.client?.id);
      setSelectedCategoryId(noteToEdit?.category?.id);
    }
  }, [noteToEdit]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () =>
        isEditMode && (
          <Button
            title="Delete"
            color="red" // Optional: style the button
            onPress={handleDelete}
          />
        ),
    });
  }, [navigation]);

  return (
    <ScrollView style={style.container}>
      {error ? <Text style={{color: 'red'}}>{error}</Text> : null}
      <TextInput
        placeholder="Note Text"
        value={text}
        onChangeText={setText}
        editable
        multiline
        numberOfLines={4}
        style={style.input}
      />
      <View style={style.selectContainer}>
        <Text>Client:</Text>

        <Picker
          selectedValue={selectedClientId}
          onValueChange={itemValue => setSelectedClientId(itemValue)}>
          {clientsData.map(client => (
            <Picker.Item
              key={client.id}
              label={client.name}
              value={client.id}
            />
          ))}
        </Picker>
      </View>

      <View style={style.selectContainer}>
        <Text>Category:</Text>

        <Picker
          mode={'dropdown'}
          numberOfLines={1}
          selectedValue={selectedCategoryId}
          onValueChange={itemValue => setSelectedCategoryId(itemValue)}>
          {categoriesData.map(category => (
            <Picker.Item
              key={category.id}
              label={category.name}
              value={category.id}
            />
          ))}
        </Picker>
      </View>

      <Button title="Save Changes" onPress={handleSubmit} />
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    fontSize: 16,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    minHeight: 100,
  },
  selectContainer: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
  },
});

export default NoteScreen;
