import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { Todo, useTodoStore } from "../store/todoStore";
import { format } from "date-fns";

interface TodoListProps {
  onEdit: (todo: Todo) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ onEdit }) => {
  const { todos, removeTodo, toggleTodo } = useTodoStore();

  const renderItem = ({ item }: { item: Todo }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={[styles.title, item.completed && styles.completed]}>
          {item.title}
        </Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.date}>
          Due: {format(new Date(item.dueDate), "MMM dd, yyyy")}
        </Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity
          style={[styles.button, styles.toggleButton]}
          onPress={() => toggleTodo(item.id)}
        >
          <Text style={styles.buttonText}>
            {item.completed ? "Mark Incomplete" : "Mark Complete"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => onEdit(item)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => removeTodo(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  button: {
    padding: 8,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
  },
  toggleButton: {
    backgroundColor: "#4CAF50",
  },
  editButton: {
    backgroundColor: "#2196F3",
  },
  deleteButton: {
    backgroundColor: "#F44336",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
