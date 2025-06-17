/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    __federation_method_getRemote,
    __federation_method_setRemote,
    // @ts-expect-error - vite global var
  } from "__federation__";
  import { Suspense, ReactNode, lazy, useRef, useEffect } from "react";
  
  interface RemoteComponentProps {
    url: string;
    remoteName: string;
    moduleKey: string;
    fallback?: ReactNode;
    framework?: "react" | "vue";
  }
  
  // eslint-disable-next-line react-refresh/only-export-components
  export const loadRemoteComponent = (props: RemoteComponentProps) => {
    const { url, remoteName, moduleKey } = props;
  
    __federation_method_setRemote(remoteName, {
      url: () => Promise.resolve(url),
      format: "esm",
      from: "vite",
    });
    return __federation_method_getRemote(remoteName, moduleKey);
  };

  // Function untuk load CSS dengan scoping
  const loadMicroappCSS = (url: string, remoteName: string) => {
    const cssId = `css-${remoteName}`;
    
    // Hapus CSS lama jika ada
    const existingCSS = document.getElementById(cssId);
    if (existingCSS) {
      existingCSS.remove();
    }
    
    // Load CSS baru
    const link = document.createElement('link');
    link.id = cssId;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    
    // Tambahkan high specificity untuk override
    link.setAttribute('data-microapp', remoteName);
    
    const possiblePaths = [
      `${url}/assets/index.css`,
      `${url}/dist/assets/index.css`,
      `${url}/assets/style.css`,
      `${url}/dist/style.css`,
      `${url}/style.css`,
    ];
    
    // Test path CSS yang ada
    const testCSS = async () => {
      console.log(`🔍 Testing CSS paths for ${remoteName}:`, possiblePaths);
      
      for (const path of possiblePaths) {
        try {
          console.log(`🧪 Testing: ${path}`);
          const response = await fetch(path, { method: 'HEAD' });
          if (response.ok) {
            link.href = path;
            
            // Insert CSS dengan priority tinggi
            const firstLink = document.head.querySelector('link[rel="stylesheet"]');
            if (firstLink) {
              document.head.insertBefore(link, firstLink.nextSibling);
            } else {
              document.head.appendChild(link);
            }
            
            console.log(`✅ CSS loaded from: ${path}`);
            
            // Force CSS apply dengan timeout
            setTimeout(() => {
              forceCSSApply(remoteName);
            }, 100);
            
            return;
          }
        } catch (error) {
          console.log(`❌ CSS not found: ${path}`, error);
        }
      }
      console.warn(`⚠️  No CSS found for ${remoteName} at ${url}`);
    };
    
    testCSS();
  };

  // Function untuk force apply CSS
  const forceCSSApply = (remoteName: string) => {
    const container = document.querySelector(`[data-microapp="${remoteName}"]`);
    if (container) {
      // Force re-render dengan class toggle
      container.classList.add('microapp-force-render');
      setTimeout(() => {
        container.classList.remove('microapp-force-render');
      }, 10);
      
      console.log(`🎨 Force CSS apply for ${remoteName}`);
    }
  };
  
  const RemoteComponentLoader = <P extends object>(
    props: RemoteComponentProps & { componentProps?: P }
  ) => {
    const {
      fallback = <div>Loading remote component...</div>,
      componentProps = {},
      framework = "react",
    } = props;

    // Load CSS saat component mount (khusus untuk Vue)
    useEffect(() => {
      if (framework === "vue") {
        console.log(`🎨 Loading CSS for ${props.remoteName} from ${props.url}`);
        loadMicroappCSS(props.url, props.remoteName);
      }
    }, [props.url, props.remoteName, framework]);
  
    const LazyComponent = lazy(() =>
      loadRemoteComponent(props).then((module: any) => {
        if (framework === "vue") {
          return { default: VueComponentWrapper(module, componentProps, props.remoteName) };
        }
  
        if (typeof module === "function") {
          return { default: module };
        }
        return module;
      })
    );
  
    return (
      <Suspense fallback={fallback}>
        <LazyComponent />
      </Suspense>
    );
  };
  
  const VueComponentWrapper = (vueModule: any, props: any, remoteName: string) => {
    return function VueWrapper() {
      const containerRef = useRef<HTMLDivElement>(null);
      const vueInstanceRef = useRef<any>(null);
  
      useEffect(() => {
        if (!containerRef.current) return;
  
        if (window.Vue) {
          try {
            const component = vueModule.default || vueModule;
  
            const app = window.Vue.createApp(component, props);
            vueInstanceRef.current = app.mount(containerRef.current);
            
            console.log('✅ Vue component mounted successfully');

            // Force CSS apply setelah component mount
            setTimeout(() => {
              if (containerRef.current) {
                containerRef.current.setAttribute('data-microapp', remoteName);
                forceCSSApply(remoteName);
              }
            }, 100);
  
            return () => {
              if (vueInstanceRef.current) {
                app.unmount();
                vueInstanceRef.current = null;
                console.log('🧹 Vue component unmounted');
              }
            };
          } catch (error) {
            console.error("❌ Error mounting Vue component:", error);
          }
        } else {
          console.error("❌ Vue is not available in the window object");
        }
      }, []);
  
      return (
        <div 
          ref={containerRef} 
          className="vue-component-container"
          data-microapp={remoteName}
          style={{ 
            width: '100%', 
            minHeight: '100%',
            position: 'relative',
            zIndex: 1
          }}
        />
      );
    };
  };
  
  declare global {
    interface Window {
      Vue?: {
        createApp: (
          component: any,
          props?: any
        ) => {
          mount: (el: HTMLElement) => any;
          unmount: () => void;
        };
      };
    }
  }
  
  export default RemoteComponentLoader;