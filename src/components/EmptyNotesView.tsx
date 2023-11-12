import {Text, View} from 'react-native';

const EmptyNotesView = () => {
  return (
    <View
      style={{
        padding: 10,
        display: 'flex',
        alignItems: 'center',
      }}>
      <Text>No notes yet!</Text>
    </View>
  );
};

export default EmptyNotesView;
