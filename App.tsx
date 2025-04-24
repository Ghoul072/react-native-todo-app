import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Provider as PaperProvider, FAB } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
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
    <SafeAreaProvider>
      <PaperProvider>
        <SafeAreaView style={styles.container}>
          <TodoList onEdit={handleEditTodo} />
          <FAB
            style={styles.fab}
            icon="plus"
            onPress={() => {
              setEditingTodo(undefined);
              setIsFormVisible(true);
            }}
          />
          <TodoForm
            visible={isFormVisible}
            onDismiss={() => {
              setIsFormVisible(false);
              setEditingTodo(undefined);
            }}
            onSubmit={handleAddTodo}
            initialTodo={editingTodo}
          />
        </SafeAreaView>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
