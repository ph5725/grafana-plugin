export interface SimpleOptions {
  portal_edit?: string;
  token_edit?: string;

  webmapId_edit?: string;
  mapServer_edit?: string;
  featureServer_edit?: string;

  mapUrl?: string;
  title_edit?: string;

  // Load map
  triggerLoadMap?: boolean;

  /** Loại bản đồ được chọn: 'webmap' | 'mapserver' | 'featureserver' */
  mapType?: 'webmap' | 'mapserver' | 'featureserver';
}
