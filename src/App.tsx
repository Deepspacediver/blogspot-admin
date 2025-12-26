import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./lib/query.config";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <></>
    </QueryClientProvider>
  );
}

export default App;
