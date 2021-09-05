import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const existsTaskWithSameName = tasks.find((task) => task.title === newTaskTitle);

    if (existsTaskWithSameName) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
      return;
    }

    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldstate) => [...oldstate, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks((oldstate) =>
      oldstate.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certza que você deseja remover este item?', [
      {
        text: 'Não',
      },
      {
        text: 'Sim',
        onPress: () => setTasks((oldstate) => oldstate.filter((task) => task.id !== id)),
      },
    ]);
  }

  function handleEditTask(id: number, taskNewTitle: string) {
    setTasks((oldstate) =>
      oldstate.map((task) => (task.id === id ? { ...task, title: taskNewTitle } : task))
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
