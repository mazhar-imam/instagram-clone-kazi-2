import AuthNavigation from "./AuthNavigation";
import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "Warning: Async Storage has been extracted from react-native core",
]);

export default function App() {
  return <AuthNavigation />;
}
