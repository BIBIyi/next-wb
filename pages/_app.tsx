import type { AppProps } from "next/app";
import "../styles/global.css";
import { useRouter } from "next/router";
import AppLayout from "@/components/layout/layout";
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const path = router.pathname;
  return path.includes("/dashboard") ? (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  ) : (
    <Component {...pageProps} />
  );
}
