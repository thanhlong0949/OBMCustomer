import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {QueryClient, QueryClientProvider} from "react-query";
import store, {persistor} from "../redux/store";
import Routes from "../routes";
import "antd/dist/antd.css";
import "../styles/_app.scss";
import "../utils/I18n";
import {AppProps} from "next/app";
import Config from "../config";
import "../firebase/config.ts";
import "react-quill/dist/quill.snow.css";
import Head from "next/head";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: Config.NETWORK_CONFIG.RETRY,
      refetchOnWindowFocus: false,
    },
  },
});

export default function MyApp({
  Component,
  pageProps,
  router,
}: AppProps): JSX.Element {
  if (typeof window !== "undefined") {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <Head>
              <title>Chợ sách cũ</title>
              <link rel="shortcut icon" href="/logo_icon.webp" />
            </Head>
            <Routes
              Component={Component}
              pageProps={pageProps}
              router={router}
            />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Routes Component={Component} pageProps={pageProps} router={router} />
      </QueryClientProvider>
    </Provider>
  );
}
