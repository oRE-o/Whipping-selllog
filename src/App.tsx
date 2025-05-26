import { MainPage } from "./pages/MainPage";

export function App() {
  return <MainPage onReady={function (): void {
    throw new Error("Function not implemented.");
  } } />;
}
