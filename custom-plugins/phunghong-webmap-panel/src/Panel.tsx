// import React, { useEffect, useRef, useState } from 'react';
// import { LuMonitor, LuMinimize } from 'react-icons/lu'; import '@arcgis/core/assets/esri/themes/light/main.css';
// import "@arcgis/map-components/components/arcgis-basemap-gallery";
// import { PanelProps } from '@grafana/data';
// import { SimpleOptions } from './types';
// // import esriRequest from '@arcgis/core/request';

// export const PageMap: React.FC<PanelProps<SimpleOptions>> = ({ width, height, options }) => {
//   const mapRef = useRef<HTMLDivElement | null>(null);
//   const viewRef = useRef<__esri.MapView | null>(null);
//   const [showInterface, setShowInterface] = useState<boolean>(true);
//   const [mapLoaded, setMapLoaded] = useState<boolean>(false);

//   useEffect(() => {
//     const loadMap = async () => {
//       const { portal_edit, token_edit, webmapId_edit } = options;
//       // Đăng ký token
//       // const token = localStorage.getItem("arcgis_token");
//       // if (token) {
//       //   const serverInfo = new ServerInfo({
//       //     server: "https://iotplatform.intelli.com.vn/portal/sharing/rest", tokenServiceUrl: "https://iotplatform.intelli.com.vn/portal/sharing/rest/generateToken"
//       //   });
//       //   IdentityManager.registerServers([serverInfo]);
//       //   IdentityManager.registerToken({
//       //     server: "https://iotplatform.intelli.com.vn/portal/sharing/rest",
//       //     userId: "portal_user", // Tuỳ chọn, có thể đặt tên bất kỳ
//       //     token,
//       //     expires: Date.now() + 60 * 60 * 1000 // Token hết hạn sau 1 tiếng
//       //   });
//       //   console.log("Token đã được đăng ký với IdentityManager");
//       // } else {
//       //   console.warn("Chưa có token, cần xử lý đăng nhập (OAuth hoặc Redirect)");
//       // }

//       // console.log("Stored token:", localStorage.getItem("arcgis_token"));

//       const [
//         WebMap,
//         MapView,
//         Portal,
//         esriConfig,
//         BasemapGallery,
//         BasemapToggle,
//         Basemap,
//         TileLayer,
//         LayerList,
//       ] = await Promise.all([
//         import('@arcgis/core/WebMap'),
//         import('@arcgis/core/views/MapView'),
//         import('@arcgis/core/portal/Portal'),
//         import('@arcgis/core/config'),
//         import('@arcgis/core/widgets/BasemapGallery'),
//         import('@arcgis/core/widgets/BasemapToggle'),
//         import('@arcgis/core/Basemap'),
//         import('@arcgis/core/layers/TileLayer'),
//         import('@arcgis/core/widgets/LayerList'),
//       ]);

//       // esriConfig.default.portalUrl = 'https://iotplatform.intelli.com.vn/portal';
//       esriConfig.default.portalUrl = portal_edit || '';

//       const portal = new Portal.default({
//         url: `${portal_edit}`,
//         authMode: 'immediate'
//       });
//       portal.authMode = 'immediate'; // không yêu cầu đăng nhập
//       console.log(portal_edit);

//       console.log('Using token:', token_edit || 'https://iotplatform.intelli.com.vn/portal');

//       // Gán token
//       // const response = await esriRequest(`${portal_edit}/apps/mapviewer/index.html?webmap=${webmapId_edit}`, {
//       // const response = await esriRequest(`https://yourportal.domain.com/arcgis/sharing/rest/content/items/${webmapId}/data?f=json`, {
//       //   query: {
//       //     f: "json",
//       //     token: token_edit
//       //   },
//       //   responseType: "json"
//       // });

//       try {
//         await portal.load();
//         console.log('Portal loaded');

//         const webmap = new WebMap.default({
//           portalItem: {
//             // id: 'd59152f99b2e4369b6b0bacad0397a74',
//             id: webmapId_edit,
//             portal,
//           },
//         });

//         await webmap.load();

//         const view = new MapView.default({
//           container: mapRef.current as HTMLDivElement,
//           map: webmap,
//         });

//         viewRef.current = view;

//         await view.when();
//         console.log('Map loaded');
//         setMapLoaded(true);

//         // @ts-ignore
//         const basemaps = [
//           'topographic',
//           'streets',
//           'imagery',
//           'community',
//           'navigation',
//         ].map((style) => new Basemap.default({
//           title: style.charAt(0).toUpperCase() + style.slice(1),
//           baseLayers: [new TileLayer.default({
//             url: `https://basemapstyles-api.arcgis.com/arcgis/rest/services/styles/v2/webmaps/arcgis/community/${style}`,
//           })],
//         }));

//         const Legend = (await import('@arcgis/core/widgets/Legend')).default;

//         const legend = new Legend({
//           view,
//         });

//         view.ui.add(legend, 'bottom-right');

//         // Tuỳ chỉnh style
//         (legend.container as HTMLElement).classList.add('toggleable-ui');
//         (legend.container as HTMLElement).style.padding = '10px';
//         (legend.container as HTMLElement).style.background = 'rgba(255,255,255,0.9)';
//         (legend.container as HTMLElement).style.maxHeight = 'auto';

//         const PortalBasemapsSource = (await import('@arcgis/core/widgets/BasemapGallery/support/PortalBasemapsSource')).default;

//         const basemapGallery = new BasemapGallery.default({
//           view,
//           container: document.createElement('div'),
//           source: new PortalBasemapsSource({
//             portal,
//             // @ts-ignore
//             filterFunction: async (item: __esri.BasemapGalleryItem) => {
//               // @ts-ignore
//               await item.load();
//               // @ts-ignore
//               return item.title !== 'Oceans'; // tùy chỉnh bộ lọc
//             },
//           }),
//         });

//         view.ui.add(basemapGallery, 'top-right');
//         (basemapGallery.container as HTMLElement).style.padding = '10px';
//         (basemapGallery.container as HTMLElement).style.maxHeight = 'auto';
//         (basemapGallery.container as HTMLElement).style.maxWidth = '300px';
//         (basemapGallery.container as HTMLElement).style.overflowY = 'auto';
//         (basemapGallery.container as HTMLElement).classList.add('toggleable-ui');

//         const basemapToggle = new BasemapToggle.default({
//           view,
//           // @ts-ignore
//           nextBasemap: 'hybrid',
//         });
//         view.ui.add(basemapToggle, 'top-left');
//         (basemapToggle.container as HTMLElement).style.display = 'flex';
//         (basemapToggle.container as HTMLElement).style.flexDirection = 'column';
//         (basemapToggle.container as HTMLElement).style.alignItems = 'center';
//         (basemapToggle.container as HTMLElement).style.maxWidth = '200px';
//       } catch (error) {
//         console.error('Failed to load map or portal:', error);
//       }

//       const layerList = new LayerList.default({
//         // @ts-ignore
//         view
//       });
//       // Adds widget below other elements in the top left corner of the view
//       // @ts-ignore
//       view.ui.add(layerList, {
//         position: "top-left"
//       });
//     };

//     loadMap(); const mapNode = mapRef.current; // gán ref vào biến cục bộ

//     return () => {
//       if (viewRef.current) {
//         viewRef.current.destroy();
//         viewRef.current = null;
//       }
//       if (mapNode) {
//         mapNode.innerHTML = '';
//       }
//     };
//   }, []);

//   const toggleInterface = () => {
//     const newState = !showInterface;
//     setShowInterface(newState);

//     const widgets = document.querySelectorAll<HTMLElement>('.toggleable-ui');
//     widgets.forEach((widget) => {
//       widget.style.display = newState ? 'block' : 'none';
//     });

//     const header = document.querySelector<HTMLElement>('.map-header');
//     if (header) {
//       header.style.display = newState ? 'flex' : 'none';
//     }

//     if (mapRef.current) {
//       mapRef.current.style.height = newState ? 'calc(95vh - 60px)' : '100vh';
//     }
//   };

//   return (
//     <div style={{ height: '100%', width: '100%' }}>
//       <div
//         className="map-header"
//         style={{
//           padding: '2px',
//           background: '#f5f5f5',
//           color: '#000000ff',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           borderBottom: '1px solid #ddd',
//           height: '40px',
//         }}>
//         <h2 style={{ margin: 0 }}>WM Mạng lưới cấp nước Data WareHouse </h2>
//       </div>

//       {mapLoaded && (
//         <button
//           onClick={toggleInterface}
//           style={{
//             padding: '10px',
//             background: 'rgba(255,255,255,0.9)',
//             color: '#333',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//             position: 'fixed',
//             left: '20px',
//             bottom: '20px',
//             zIndex: 1000,
//             boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             width: '40px',
//             height: '40px',
//           }}
//           title={showInterface ? 'Ẩn giao diện' : 'Hiện giao diện'}
//         >
//           {showInterface ? (
//             <LuMonitor size={20} color="#333" />
//           ) : (
//             <LuMinimize size={20} color="#333" />
//           )}
//         </button>
//       )}

//       <div
//         ref={mapRef}
//         style={{
//           height: showInterface ? 'calc(95vh - 60px)' : '100vh',
//           width: '100%',
//           transition: 'height 0.3s ease',
//         }}
//       />
//     </div>
//   );
// };

import React, { useEffect, useRef, useState } from 'react';
import { LuMonitor, LuMinimize } from 'react-icons/lu'; import '@arcgis/core/assets/esri/themes/light/main.css';
import "@arcgis/map-components/components/arcgis-basemap-gallery";
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from './types';
// import esriRequest from '@arcgis/core/request';

export const PageMap: React.FC<PanelProps<SimpleOptions>> = ({ width, height, options }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<__esri.MapView | null>(null);
  const [showInterface, setShowInterface] = useState<boolean>(true);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  // Hàm load bản đồ
  const loadWebMap = async () => {
    const { portal_edit, token_edit, webmapId_edit } = options;

    const [
      // Map,
      WebMap,
      MapView,
      Portal,
      esriConfig,
      // BasemapGallery,
      // BasemapToggle,
      // Basemap,
      // TileLayer,
      LayerList,
    ] = await Promise.all([
      // import('@arcgis/core/Map'),
      import('@arcgis/core/WebMap'),
      import('@arcgis/core/views/MapView'),
      import('@arcgis/core/portal/Portal'),
      import('@arcgis/core/config'),
      // import('@arcgis/core/widgets/BasemapGallery'),
      // import('@arcgis/core/widgets/BasemapToggle'),
      // import('@arcgis/core/Basemap'),
      // import('@arcgis/core/layers/TileLayer'),
      import('@arcgis/core/widgets/LayerList'),
    ]);

    // esriConfig.default.portalUrl = 'https://iotplatform.intelli.com.vn/portal';
    esriConfig.default.portalUrl = portal_edit || '';

    const portal = new Portal.default({
      url: `${portal_edit}`,
      authMode: 'immediate'
    });
    portal.authMode = 'immediate'; // không yêu cầu đăng nhập
    console.log(portal_edit);

    console.log('Using token:', token_edit || 'https://iotplatform.intelli.com.vn/portal');

    // Gán token
    // const response = await esriRequest(`${portal_edit}/apps/mapviewer/index.html?webmap=${webmapId_edit}`, {
    // const response = await esriRequest(`https://yourportal.domain.com/arcgis/sharing/rest/content/items/${webmapId}/data?f=json`, {
    //   query: {
    //     f: "json",
    //     token: token_edit
    //   },
    //   responseType: "json"
    // });

    try {
      await portal.load();
      console.log('Portal loaded');

      const webmap = new WebMap.default({
        portalItem: {
          // id: 'd59152f99b2e4369b6b0bacad0397a74',
          id: webmapId_edit,
          portal,
        },
      });

      await webmap.load();

      const view = new MapView.default({
        container: mapRef.current as HTMLDivElement,
        map: webmap,
      });

      viewRef.current = view;

      await view.when();
      console.log('Map loaded');
      setMapLoaded(true);

      // // @ts-ignore
      // const basemaps = [
      //   'topographic',
      //   'streets',
      //   'imagery',
      //   'community',
      //   'navigation',
      // ].map((style) => new Basemap.default({
      //   title: style.charAt(0).toUpperCase() + style.slice(1),
      //   baseLayers: [new TileLayer.default({
      //     url: `https://basemapstyles-api.arcgis.com/arcgis/rest/services/styles/v2/webmaps/arcgis/community/${style}`,
      //   })],
      // }));

      // const Legend = (await import('@arcgis/core/widgets/Legend')).default;

      // const legend = new Legend({
      //   view,
      // });

      // view.ui.add(legend, 'bottom-right');

      // // Tuỳ chỉnh style
      // (legend.container as HTMLElement).classList.add('toggleable-ui');
      // (legend.container as HTMLElement).style.padding = '10px';
      // (legend.container as HTMLElement).style.background = 'rgba(255,255,255,0.9)';
      // (legend.container as HTMLElement).style.maxHeight = 'auto';

      // const PortalBasemapsSource = (await import('@arcgis/core/widgets/BasemapGallery/support/PortalBasemapsSource')).default;

      // const basemapGallery = new BasemapGallery.default({
      //   view,
      //   container: document.createElement('div'),
      //   source: new PortalBasemapsSource({
      //     portal,
      //     // @ts-ignore
      //     filterFunction: async (item: __esri.BasemapGalleryItem) => {
      //       // @ts-ignore
      //       await item.load();
      //       // @ts-ignore
      //       return item.title !== 'Oceans'; // tùy chỉnh bộ lọc
      //     },
      //   }),
      // });

      // view.ui.add(basemapGallery, 'top-right');
      // (basemapGallery.container as HTMLElement).style.padding = '10px';
      // (basemapGallery.container as HTMLElement).style.maxHeight = 'auto';
      // (basemapGallery.container as HTMLElement).style.maxWidth = '300px';
      // (basemapGallery.container as HTMLElement).style.overflowY = 'auto';
      // (basemapGallery.container as HTMLElement).classList.add('toggleable-ui');

      // const basemapToggle = new BasemapToggle.default({
      //   view,
      //   // @ts-ignore
      //   nextBasemap: 'hybrid',
      // });
      // view.ui.add(basemapToggle, 'top-left');
      // (basemapToggle.container as HTMLElement).style.display = 'flex';
      // (basemapToggle.container as HTMLElement).style.flexDirection = 'column';
      // (basemapToggle.container as HTMLElement).style.alignItems = 'center';
      // (basemapToggle.container as HTMLElement).style.maxWidth = '200px';
    } catch (error) {
      console.error('Failed to load map or portal:', error);
    }

    const layerList = new LayerList.default({
      // @ts-ignore
      view
    });
    // Adds widget below other elements in the top left corner of the view
    // @ts-ignore
    view.ui.add(layerList, {
      position: "top-left"
    });
  };

  // Chỉ gọi loadMap khi isLoaded = true
  // useEffect(() => {
  //   if (options.triggerLoadMap) {
  //     loadWebMap();
  //   }

  //   return () => {
  //     if (viewRef.current) {
  //       viewRef.current.destroy();
  //       viewRef.current = null;
  //     }
  //     if (mapRef.current) {
  //       mapRef.current.innerHTML = '';
  //     }
  //   };
  // }, [options.triggerLoadMap]); // 👈 chỉ load khi triggerLoadMap true

  // Map Server
  const loadMapServer = async () => {
    const [Map, MapView, MapImageLayer, LayerList] = await Promise.all([
      import('@arcgis/core/Map'),
      import('@arcgis/core/views/MapView'),
      import('@arcgis/core/layers/MapImageLayer'),
      import('@arcgis/core/widgets/LayerList'),
    ]);

    const layer = new MapImageLayer.default({
      url: `${options.mapServer_edit}?f=json&token=${options.token_edit}`,
    });

    const map = new Map.default({
      basemap: 'streets',
      layers: [layer],
    });

    const view = new MapView.default({
      container: mapRef.current as HTMLDivElement,
      map,
    });

    viewRef.current = view;
    await view.when();
    setMapLoaded(true);
    console.log('MapServer loaded');

    const layerList = new LayerList.default({
      view,
    });

    view.ui.add(layerList, 'top-right');
  };

  // Feature Server
  const loadFeatureServer = async () => {
    const [Map, MapView, FeatureLayer, LayerList] = await Promise.all([
      import('@arcgis/core/Map'),
      import('@arcgis/core/views/MapView'),
      import('@arcgis/core/layers/FeatureLayer'),
      import('@arcgis/core/widgets/LayerList'),
    ]);

    const featureLayer = new FeatureLayer.default({
      url: options.featureServer_edit,
    });

    const map = new Map.default({
      basemap: 'topo-vector',
      layers: [featureLayer],
    });

    const view = new MapView.default({
      container: mapRef.current as HTMLDivElement,
      map,
    });

    viewRef.current = view;
    await view.when();
    setMapLoaded(true);
    console.log('FeatureServer loaded');

    const layerList = new LayerList.default({
      view,
    });

    view.ui.add(layerList, 'top-right');
  };

  useEffect(() => {
    const loadMap = async () => {
      switch (options.mapType) {
        case 'webmap':
          if (!options.webmapId_edit) {
            setErrorMessage('⚠️ WebMap ID là bắt buộc đối với WebMap');
            return;
          } else {
            setErrorMessage(null); // clear error if valid
            await loadWebMap();
          }

          break;
        case 'mapserver':
          if (!options.mapServer_edit) {
            setErrorMessage('⚠️ Service Item Id là bắt buộc đối với Map Server');
            return;
          } else {
            setErrorMessage(null); // clear error if valid
            await loadMapServer();
          }

          console.log(`Loading MapServer: ${options.mapServer_edit}`);
          break;
        case 'featureserver':
          if (!options.featureServer_edit) {
            setErrorMessage('⚠️ Service Item Id là bắt buộc đối với Feature Server');
            return;
          } else {
            setErrorMessage(null); // clear error if valid
            await loadFeatureServer();
          }

          console.log(`Loading Feature Server: ${options.featureServer_edit}`);
          break;
        default:
          console.warn('Invalid map type');
      }
    };

    if (options.triggerLoadMap) {
      loadMap();
    }

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
      if (mapRef.current) {
        mapRef.current.innerHTML = '';
      }
    };
  }, [options.triggerLoadMap, options.mapType]);

  const toggleInterface = () => {
    const newState = !showInterface;
    setShowInterface(newState);

    const widgets = document.querySelectorAll<HTMLElement>('.toggleable-ui');
    widgets.forEach((widget) => {
      widget.style.display = newState ? 'block' : 'none';
    });

    const header = document.querySelector<HTMLElement>('.map-header');
    if (header) {
      header.style.display = newState ? 'flex' : 'none';
    }

    if (mapRef.current) {
      mapRef.current.style.height = newState ? 'calc(95vh - 60px)' : '100vh';
    }
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div
        className="map-header"
        style={{
          padding: '2px',
          background: '#f5f5f5',
          color: '#000000ff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #ddd',
          height: '40px',
        }}>
        <h2 style={{ margin: 0 }}>{options.title_edit}</h2>
      </div>

      {mapLoaded && (
        <button
          onClick={toggleInterface}
          style={{
            padding: '10px',
            background: 'rgba(255,255,255,0.9)',
            color: '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            position: 'fixed',
            left: '20px',
            bottom: '20px',
            zIndex: 1000,
            boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
          }}
          title={showInterface ? 'Ẩn giao diện' : 'Hiện giao diện'}
        >
          {showInterface ? (
            <LuMonitor size={20} color="#333" />
          ) : (
            <LuMinimize size={20} color="#333" />
          )}
        </button>
      )}

      {errorMessage && (
        <div style={{ color: 'red', marginTop: '8px' }}>
          {errorMessage}
        </div>
      )}

      <div
        ref={mapRef}
        style={{
          height: showInterface ? 'calc(95vh - 60px)' : '100vh',
          width: '100%',
          transition: 'height 0.3s ease',
        }}
      />
    </div>
  );
};