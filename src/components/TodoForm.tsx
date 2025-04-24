import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Portal, Modal, useTheme } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Todo } from "../store/todoStore";

interface TodoFormProps {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: (todo: Omit<Todo, "id" | "completed">) => void;
  initialTodo?: Todo;
}

export const TodoForm: React.FC<TodoFormProps> = ({
  visible,
  onDismiss,
  onSubmit,
  initialTodo,
}) => {
  const [title, setTitle] = useState(initialTodo?.title || "");
  const [description, setDescription] = useState(
    initialTodo?.description || ""
  );
  const [dueDate, setDueDate] = useState(
    initialTodo ? new Date(initialTodo.dueDate) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const theme = useTheme();

  const handleSubmit = () => {
    onSubmit({
      title,
      description,
      dueDate,
    });
    setTitle("");
    setDescription("");
    setDueDate(new Date());
    onDismiss();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <View style={styles.container}>
          <TextInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            multiline
            style={styles.input}
          />
          <Button
            mode="outlined"
            onPress={() => setShowDatePicker(true)}
            style={styles.dateButton}
          >
            {dueDate.toLocaleDateString()}
          </Button>
          {showDatePicker && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setDueDate(selectedDate);
                }
              }}
            />
          )}
          <View style={styles.buttonContainer}>
            <Button mode="outlined" onPress={onDismiss} style={styles.button}>
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
              disabled={!title.trim()}
            >
              {initialTodo ? "Update" : "Add"} Todo
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 8,
  },
  container: {
    gap: 16,
  },
  input: {
    marginBottom: 8,
  },
  dateButton: {
    marginVertical: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});
