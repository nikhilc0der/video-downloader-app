import { Provider } from "react-redux";
import StackNavigatorApp from "./components/Navigators/StackNavigatorApp";
import Store from "./redux/stores/Store";

export default function App() {
  return (
    <>
      <Provider store={Store}>
        <StackNavigatorApp />
      </Provider>
    </>
  );
}
