// import React, { useEffect, useRef, useState } from 'react';
// import { PanelProps } from '@grafana/data';
// import { LuMonitor, LuMinimize } from 'react-icons/lu';
// import '@arcgis/core/assets/esri/themes/light/main.css';
// import { SimpleOptions } from '../types';

// export const SimplePanel: React.FC<PanelProps<SimpleOptions>> = ({ options, width, height }) => {
//   const mapRef = useRef<HTMLDivElement | null>(null);
//   const [showInterface, setShowInterface] = useState<boolean>(true);
//   const [mapLoaded, setMapLoaded] = useState<boolean>(false);
//   const viewRef = useRef<any>(null); // Sử dụng any để tránh lỗi kiểu

//   useEffect(() => {
//     const loadMap = async () => {
//       try {
//         const [
//           WebMapModule,
//           MapViewModule,
//           PortalModule,
//           esriConfig,
//           LegendModule,
//           BasemapGalleryModule,
//           BasemapToggleModule,
//           HomeModule,
//         ] = await Promise.all([
//           import('@arcgis/core/WebMap'),
//           import('@arcgis/core/views/MapView'),
//           import('@arcgis/core/portal/Portal'),
//           import('@arcgis/core/config'),
//           import('@arcgis/core/widgets/Legend'),
//           import('@arcgis/core/widgets/BasemapGallery'),
//           import('@arcgis/core/widgets/BasemapToggle'),
//           import('@arcgis/core/widgets/Home'),
//         ]);

//         esriConfig.default.portalUrl = 'https://iotplatform.intelli.com.vn/portal';

//         const portal = new PortalModule.default({
//           url: 'https://iotplatform.intelli.com.vn/portal',
//           authMode: 'auto',
//         });

//         await portal.load();

//         const webmap = new WebMapModule.default({
//           portalItem: {
//             id: 'd59152f99b2e4369b6b0bacad0397a74',
//             portal,
//           },
//         });

//         await webmap.load();

//         const view = new MapViewModule.default({
//           container: mapRef.current!,
//           map: webmap,
//           spatialReference: { wkid: 102100 },
//         });

//         viewRef.current = view;
//         await view.when();
//         console.log('Map loaded successfully');
//         setMapLoaded(true);

//         const legend = new LegendModule.default({
//           view,
//           style: { type: 'card' },
//         });
//         view.ui.add(legend, 'bottom-right');
//         (legend.container as HTMLElement).style.padding = '10px';
//         (legend.container as HTMLElement).style.maxHeight = '500px';
//         (legend.container as HTMLElement).style.overflowY = 'auto';
//         (legend.container as HTMLElement).classList.add('toggleable-ui');

//         const basemapGallery = new BasemapGalleryModule.default({
//           view,
//           container: document.createElement('div'),
//           source: {
//             query: {
//               title: '"World Basemaps for Developers" AND owner:esri',
//             },
//           },
//         });
//         view.ui.add(basemapGallery, 'top-right');
//         (basemapGallery.container as HTMLElement).style.padding = '10px';
//         (basemapGallery.container as HTMLElement).style.maxHeight = '400px';
//         (basemapGallery.container as HTMLElement).style.overflowY = 'auto';
//         (basemapGallery.container as HTMLElement).classList.add('toggleable-ui');

//         const basemapToggle = new BasemapToggleModule.default({
//           view,
//           nextBasemap: 'satellite',
//         });
//         view.ui.add(basemapToggle, 'top-right');

//         const homeWidget = new HomeModule.default({
//           view,
//         });
//         view.ui.add(homeWidget, 'top-left');
//       } catch (error) {
//         console.error('Failed to load map:', error);
//       }
//     };

//     loadMap();

//     return () => {
//       if (mapRef.current) {
//         mapRef.current.innerHTML = '';
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
//       mapRef.current.style.height = newState ? 'calc(100vh - 60px)' : '100vh';
//     }
//   };

//   // Sử dụng options.text để hiển thị tiêu đề động
//   return (
//     <div style={{ height: height ?? '100vh', width: width ?? '100%' }}>
//       <div
//         className="map-header"
//         style={{
//           padding: '10px',
//           background: '#f5f5f5',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           borderBottom: '1px solid #ddd',
//           height: '60px',
//         }}
//       >
//         <h2 style={{ margin: 0 }}>{options?.text || 'Bản đồ hệ thống IoT'}</h2>
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
//             <span style={{ fontSize: '10px' }}>
//               <LuMonitor size={20} color="#333" />
//             </span>
//           ) : (
//             <span style={{ fontSize: '10px' }}>
//               <LuMinimize size={20} color="#333" />
//             </span>
//           )}
//         </button>
//       )}

//       <div
//         ref={mapRef}
//         style={{
//           height: 'calc(100% - 60px)',
//           width: '100%',
//           transition: 'height 0.3s ease',
//         }}
//       />
//     </div>
//   );
// };

// export default SimplePanel;