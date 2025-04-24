import { useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Text,
} from "react-native";
import { TodoList } from "./src/components/TodoList";
import { TodoForm } from "./src/components/TodoForm";
import { Todo, useTodoStore } from "./src/store/todoStore";

export default function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>();
  const { addTodo, editTodo } = useTodoStore();

  const handleAddTodo = (todo: Omit<Todo, "id" | "completed">) => {
    if (editingTodo) {
      editTodo(editingTodo.id, todo);
      setEditingTodo(undefined);
    } else {
      addTodo(todo);
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setIsFormVisible(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TodoList onEdit={handleEditTodo} />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          setEditingTodo(undefined);
          setIsFormVisible(true);
        }}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
      <TodoForm
        visible={isFormVisible}
        onDismiss={() => {
          setIsFormVisible(false);
          setEditingTodo(undefined);
        }}
        onSubmit={handleAddTodo}
        initialTodo={editingTodo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
