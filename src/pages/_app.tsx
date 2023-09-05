import type { AppProps } from "next/app";
import "../styles/styles.css";
import { TodoProvider } from "@/components/TodoContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TodoProvider>
      <Component {...pageProps} />
    </TodoProvider>
  );
}
