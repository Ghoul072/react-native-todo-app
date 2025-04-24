import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal as RNModal,
  Platform,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
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
    <RNModal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onDismiss}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            placeholder="Enter todo title"
          />
          <Text style={styles.label}>Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            multiline
            style={[styles.input, styles.textArea]}
            placeholder="Enter todo description"
          />
          <Text style={styles.label}>Due Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{dueDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setDueDate(selectedDate);
                }
              }}
            />
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onDismiss}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}
              disabled={!title.trim()}
            >
              <Text style={styles.buttonText}>
                {initialTodo ? "Update" : "Add"} Todo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 8,
    width: "90%",
    maxWidth: 400,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 4,
    marginHorizontal: 4,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f44336",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
