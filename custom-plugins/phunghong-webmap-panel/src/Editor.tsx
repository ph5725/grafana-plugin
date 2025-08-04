import React, { useEffect, useRef } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from './types';

export const WebMapPanel: React.FC<PanelProps<SimpleOptions>> = ({ options }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { portal, token, webmapId } = options;

  useEffect(() => {
    if (!portal || !containerRef.current) return;

    // đảm bảo encode token nếu cần
    const separator = portal.includes('?') ? '&' : '?';
    const fullUrl = `${portal}${separator}token=${encodeURIComponent(token || '')}`;

    containerRef.current.innerHTML = `
      <iframe src="${fullUrl}" width="100%" height="100%" style="border: none;"></iframe>
    `;
  }, [portal, token, webmapId]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};
