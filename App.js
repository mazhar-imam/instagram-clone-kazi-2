import AuthNavigation from "./AuthNavigation";
import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "Warning: Async Storage has been extracted from react-native core",
  "Setting a timer for a long period of time",
  "Warning: Cannot record touch end without a touch start",
  "Uncaught Error in snapshot listener",
]);

export default function App() {
  return <AuthNavigation />;
}
