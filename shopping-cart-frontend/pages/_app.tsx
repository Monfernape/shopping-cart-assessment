import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { QueryClientProvider } from "react-query";
import { Navbar } from "../components";
import { queryClient } from "../constants"
import "tailwindcss/tailwind.css";


function MyApp({ Component, pageProps }: AppProps) {
  const { route } = useRouter()
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar key={route} />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
export default MyApp;
