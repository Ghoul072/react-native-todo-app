import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Card, Title, Paragraph, Button, useTheme } from "react-native-paper";
import { Todo, useTodoStore } from "../store/todoStore";
import { format } from "date-fns";

interface TodoListProps {
  onEdit: (todo: Todo) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ onEdit }) => {
  const { todos, removeTodo, toggleTodo } = useTodoStore();
  const theme = useTheme();

  const renderItem = ({ item }: { item: Todo }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={item.completed ? styles.completed : undefined}>
          {item.title}
        </Title>
        <Paragraph>{item.description}</Paragraph>
        <Paragraph>
          Due: {format(new Date(item.dueDate), "MMM dd, yyyy")}
        </Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => toggleTodo(item.id)}>
          {item.completed ? "Mark Incomplete" : "Mark Complete"}
        </Button>
        <Button onPress={() => onEdit(item)}>Edit</Button>
        <Button onPress={() => removeTodo(item.id)}>Delete</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#888",
  },
});
