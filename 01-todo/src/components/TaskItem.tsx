import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Task } from './TasksList';

interface TaskListProps {
  index: number;
  item: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, taskNewTitle: string) => void;
}

export function TaskItem({ index, item, toggleTaskDone, removeTask, editTask }: TaskListProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>(item.title);

  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (isEditing) {
      textInputRef.current?.focus();
    } else {
      textInputRef.current?.blur();
    }
  }, [isEditing]);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    console.log('lo');
    setIsEditing(false);
    setTaskTitle(item.title);
  }

  function handleSubmitEditing() {
    editTask(item.id, taskTitle);
    setIsEditing(false);
  }

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          {isEditing ? (
            <TextInput
              ref={textInputRef}
              value={taskTitle}
              onChangeText={(value) => setTaskTitle(value)}
              editable={isEditing}
              onSubmitEditing={handleSubmitEditing}
              style={item.done ? styles.taskTextDone : styles.taskText}
            />
          ) : (
            <Text style={item.done ? styles.taskTextDone : styles.taskText}>{item.title}</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isEditing ? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Icon name="edit-2" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        )}

        <View style={styles.iconsDivider}>
          <TouchableOpacity disabled={isEditing} onPress={() => removeTask(item.id)}>
            <Icon
              name="trash"
              size={24}
              color="#b2b2b2"
              style={isEditing ? { opacity: 0.3 } : {}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconsDivider: {
    borderLeftWidth: 0.75,
    borderColor: '#b2b2b2',
    marginHorizontal: 15,
    paddingHorizontal: 15,
  },
});
