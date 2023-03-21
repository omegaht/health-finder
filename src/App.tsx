import { ChakraBaseProvider, extendBaseTheme } from "@chakra-ui/react";
import chakraTheme from "@chakra-ui/theme";
import Toast from "components/Toast";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "routes";

const { Button } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
  },
});

function App() {
  return (
    <ChakraBaseProvider theme={theme}>
      <Toast />
      <Router>
        <AppRoutes />
      </Router>
    </ChakraBaseProvider>
  );
}

export default App;
