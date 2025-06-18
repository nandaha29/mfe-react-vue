// RemoteComponentLoader.tsx - Versi yang lebih robust
import {
    __federation_method_getRemote,
    __federation_method_setRemote,
    // @ts-expect-error - vite global var
  } from "__federation__";
  import { ReactNode, useEffect, useState } from "react";
  
  interface RemoteComponentProps {
    url: string;
    remoteName: string;
    moduleKey: string;
    fallback?: ReactNode;
    key?: string;
  }
  
  const RemoteComponentLoader = <P extends object>(props: RemoteComponentProps & {componentProps?: P}) => {
    const { fallback = <div>Loading remote component...</div>, componentProps = {}, key } = props;
    const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
      let isMounted = true;
      
      const loadComponent = async () => {
        try {
          setLoading(true);
          setError(null);
          setComponent(null);
          
          console.log(`Loading remote component: ${props.remoteName}/${props.moduleKey}`);
          
          const { url, remoteName, moduleKey } = props;

          __federation_method_setRemote(remoteName, {
            url: () => Promise.resolve(url),
            format: "esm",
            from: "vite",
          });

          const module = await __federation_method_getRemote(remoteName, moduleKey);
          
          if (!isMounted) return;
          
          let ComponentToRender;
          if (typeof module === 'function') {
            ComponentToRender = module;
          } else if (module.default) {
            ComponentToRender = module.default;
          } else {
            throw new Error('No valid component found in module');
          }
          
          setComponent(() => ComponentToRender);
          console.log(`Successfully loaded: ${remoteName}/${moduleKey}`);
          
        } catch (err) {
          console.error(`Failed to load remote component ${props.remoteName}/${props.moduleKey}:`, err);
          if (isMounted) {
            setError(err instanceof Error ? err.message : 'Unknown error');
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      };

      loadComponent();
      
      return () => {
        isMounted = false;
      };
    }, [props.url, props.remoteName, props.moduleKey, key]); // Re-run saat key berubah
    
    if (loading) {
      return <>{fallback}</>;
    }
    
    if (error) {
      return (
        <div style={{ color: 'red', padding: '10px' }}>
          Error loading {props.remoteName}: {error}
          <button 
            onClick={() => window.location.reload()} 
            style={{ marginLeft: '10px', padding: '5px 10px' }}
          >
            Reload
          </button>
        </div>
      );
    }
    
    if (!Component) {
      return <div>Component not found</div>;
    }

    return <Component {...componentProps as P} />;
  };
  
  export default RemoteComponentLoader;