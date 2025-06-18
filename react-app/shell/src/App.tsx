// App.tsx
import { useEffect } from "react"; // useRef is no longer needed for this specific logic
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import { useNats, NavigationMessage } from "./utils/nats-bus"; // Adjust path if needed

// import vue secara universal
import * as Vue from "vue";

import RemoteComponentLoader from "./components/RemoteLoader";
import RemoteComponentLoaderVue from "./components/RemoteLoaderV";

// vue bisa berjalan tanpa konflik
if (!window.Vue) {
  window.Vue = Vue;
}
window.Vue = Vue;

const getAppNameForPath = (pathname: string): string | null => {
  if (pathname === "/") return "homeApp";
  if (pathname.startsWith("/about")) return "aboutApp";
  if (pathname.startsWith("/service")) return "serviceApp";
  if (pathname.startsWith("/blog")) return "blogApp";
  if (pathname.startsWith("/contact")) return "contactApp";
  return null;
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const { publishMessage, subscribeToMessages, isConnected, error: natsError } = useNats();

  // Set navigateTo ke window agar bisa diakses di semua microfrontend
  useEffect(() => {
    window.navigateTo = (path: string) => {
      navigate(path);
    };
  }, [navigate]);


  // NATS Subscription Effect
  useEffect(() => {
    if (!isConnected) {
      console.log("[App.tsx] NATS not connected, skipping subscription.");
      return;
    }

    const handleNatsNavigation = (message: NavigationMessage) => {
      console.log("Received NATS message in [App.tsx] shell:", message);
      // Example: if (message.action === "navigateTo" && message.page && location.pathname !== message.page) {
      //   console.log(`[App.tsx] Navigating to ${message.page} based on NATS message`);
      //   navigate(message.page);
      // }
    };

    let unsubscribe: (() => void) | undefined;

    subscribeToMessages(handleNatsNavigation)
      .then(unsub => {
        unsubscribe = unsub;
      })
      .catch(err => console.error("[App.tsx] Failed to subscribe to NATS messages:", err));

    return () => {
      if (unsubscribe) {
        console.log("[App.tsx] Cleaning up NATS subscription.");
        unsubscribe();
      }
    };
  }, [isConnected, subscribeToMessages, navigate, location.pathname]);

  // NATS Logging Effect for route changes (entering and leaving with duration)
 useEffect(() => {
    const currentAppName = getAppNameForPath(location.pathname);

    if (currentAppName && isConnected) {
      publishMessage("entering", currentAppName);
      const entryTime = Date.now(); 

      return () => {
        if (isConnected) { 
          const duration = Date.now() - entryTime;
          // This line causes the error if publishMessage is not seen as accepting 3 args
          publishMessage("leaving", currentAppName, duration); 
        }
      };
    }
    return undefined;
  }, [location.pathname, isConnected, publishMessage]);

  // Display NATS connection error if any
  useEffect(() => {
    if (natsError) {
      console.error("❌ [App.tsx] NATS Hook Error:", natsError.message);
    }
  }, [natsError]);

   useEffect(() => {
    console.log(`[App.tsx] NATS Connection Status: ${isConnected}`);
  }, [isConnected]);

  return (
    <>
      {/* Navbar always on top - KEY PROP causes remount of Navbar on path change */}
      <RemoteComponentLoader
        key={location.pathname}
        url={import.meta.env.VITE_NAVBAR_HOST}
        remoteName="navbarApp"
        moduleKey="./Navbar"
        fallback={<div>Loading Navbar...</div>}
      />

      <main style={{ paddingTop: "5rem" }}>
        <Routes>
          <Route
            path="/"
            element={
              <RemoteComponentLoaderVue
                url={import.meta.env.VITE_HOME_HOST}
                remoteName="homeApp"
                moduleKey="./App"
                fallback={<div>Loading Home...</div>}
                framework="vue"
              />
            }
          />
          <Route
            path="/about"
            element={
              <RemoteComponentLoaderVue
                url={import.meta.env.VITE_ABOUT_HOST}
                remoteName="aboutApp"
                moduleKey="./App"
                fallback={<div>Loading about...</div>}
                framework="vue"
              />
            }
          />
          <Route
            path="/service"
            element={
              <RemoteComponentLoaderVue
                url={import.meta.env.VITE_SERVICE_HOST}
                remoteName="serviceApp"
                moduleKey="./App"
                fallback={<div>Loading Service...</div>}
                framework="vue"
              />
            }
          />
          <Route
            path="/blog/*"
            element={
              <RemoteComponentLoader
                url={import.meta.env.VITE_BLOG_HOST}
                remoteName="blogApp"
                moduleKey="./App"
                fallback={<div>Loading Blog...</div>}
              />
            }
          />
          <Route
            path="/contact"
            element={
              <RemoteComponentLoader
                url={import.meta.env.VITE_CONTACT_HOST}
                remoteName="contactApp"
                moduleKey="./App"
                fallback={<div>Loading Contact...</div>}
              />
            }
          />
        </Routes>
      </main>

      {/* Footer always on bottom */}
      <RemoteComponentLoader
        url={import.meta.env.VITE_FOOTER_HOST}
        remoteName="footerApp"
        moduleKey="./Footer"
        fallback={<div>Loading Footer...</div>}
      />
    </>
  );
}

export default App;

// Untuk microfrontend lain: import { useNats } from 'path/to/nats-bus'
// lalu publishMessage('click', 'blog/article/123') pada event penting