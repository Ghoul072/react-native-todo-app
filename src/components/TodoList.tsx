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
    <View style={[styles.card, item.completed && styles.completedCard]}>
      <View style={styles.cardHeader}>
        <TouchableOpacity
          style={[styles.checkbox, item.completed && styles.checked]}
          onPress={() => toggleTodo(item.id)}
        >
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, item.completed && styles.completed]}>
            {item.title}
          </Text>
          <Text style={styles.date}>
            Due: {format(new Date(item.dueDate), "MMM dd, yyyy")}
          </Text>
        </View>
      </View>
      {item.description && (
        <Text style={[styles.description, item.completed && styles.completed]}>
          {item.description}
        </Text>
      )}
      <View style={styles.cardActions}>
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
    backgroundColor: "#f8f9fa",
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    overflow: "hidden",
  },
  completedCard: {
    opacity: 0.8,
    backgroundColor: "#f8f9fa",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checked: {
    backgroundColor: "#4CAF50",
  },
  checkmark: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    padding: 16,
    paddingTop: 8,
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginLeft: 8,
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
    fontSize: 14,
  },
});
