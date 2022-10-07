import { StyleSheet, Text, View } from "react-native";
import { Octicons } from "@expo/vector-icons";

export const statusChecker = (status) => {
  switch (status) {
    case "done":
      return (
        <View style={statusCheckerStyles.done}>
          <Octicons name="dot-fill" size={12} color="green" />
          <Text style={statusCheckerStyles.doneText}>Done</Text>
        </View>
      );
    case "inProgress":
      return (
        <View style={statusCheckerStyles.inProgress}>
          <Octicons name="dot-fill" size={12} color="yellow" />
          <Text>In Progress</Text>
        </View>
      );
    case "todo":
      return (
        <View style={statusCheckerStyles.notStarted}>
          <Octicons name="dot-fill" size={12} color="red" />
          <Text style={statusCheckerStyles.notStartedText}>To Do</Text>
        </View>
      );
  }
};

const statusCheckerStyles = StyleSheet.create({
  done: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 24,
    backgroundColor: "rgba(12, 189, 14, 0.2)",
  },
  inProgress: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 24,
    backgroundColor: "rgba(209, 171, 16, 0.2)",
  },
  notStarted: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 24,
    backgroundColor: "rgba(209, 16, 22, 0.2)",
  },
  doneText: {
    color: "green",
    fontSize: 14,
    marginLeft: 4,
  },
  inProgressText: {
    color: "yellow",
    fontSize: 14,
    marginLeft: 4,
  },
  notStartedText: {
    color: "red",
    fontSize: 14,
    marginLeft: 4,
  },
});
