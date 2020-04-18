import React from 'react'
import { View, SafeAreaView, StyleSheet, Button, Text } from 'react-native'

interface SelectionProps {
  value: string
  onChange(val: string): void
}

const list = [
  {
    id: 'column',
    label: 'Column'
  },
  {
    id: 'row',
    label: 'Row'
  },
  {
    id: 'wrap',
    label: 'Wrap'
  }
]

const Selection: React.FC<SelectionProps> = ({ value, onChange }) => {
  return (
    <SafeAreaView style={styles.container}>
      {list.map(item => (
        <View key={item.id} style={styles.section}>
          <Button title={item.label} onPress={() => onChange(item.id)} />
          {value === item.id && <Text style={styles.checkMark}>✓</Text> }
        </View>
      ))}
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 0,
    left: 0,
    right: 0,
  },
  section: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  checkMark: {
    alignSelf: 'center',
    color: 'green',
    fontSize: 24,
    position: 'absolute',
    right: 40
  }
});

export default Selection
