import React, { useEffect, useRef, useState } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from './types';
import { PageMap } from './Panel'; // Nhập PageMap để render

export const WebMapPanel: React.FC<PanelProps<SimpleOptions>> = ({
  options,
  width,
  height,
  id,
  data,
  timeRange,
  timeZone,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const { portal_edit, token_edit, webmapId_edit } = options;

  useEffect(() => {
    const validateInputs = async () => {
      // Kiểm tra container
      if (!containerRef.current) {
        setErrorMessage('Lỗi: Container không tồn tại.'); 
        return;
      }

      // Kiểm tra bắt buộc portal
      if (!portal_edit) {
        setErrorMessage('Lỗi: Vui lòng cung cấp URL của ArcGIS Portal.');
        return;
      }

      // Kiểm tra bắt buộc webmapId
      if (!webmapId_edit) {
        setErrorMessage('Lỗi: Vui lòng cung cấp ID của WebMap.');
        return;
      }

      // Kiểm tra bắt buộc token
      if (!token_edit) {
        setErrorMessage('Lỗi: Token là bắt buộc để truy cập WebMap.');
        return;
      }

      // Kiểm tra tính hợp lệ của token
      try {
        const response = await fetch(`${portal_edit}/sharing/rest/portals/self?f=json&token=${token_edit}`);
        const data = await response.json();
        if (data.error && (data.error.code === 498 || data.error.code === 499)) {
          setErrorMessage('Lỗi: Token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại.');
          return;
        }
      } catch (error) {
        setErrorMessage('Lỗi: Không thể xác thực token. Vui lòng kiểm tra kết nối hoặc đăng nhập lại.');
        console.error('Token validation failed:', error);
        return;
      }

      // Nếu tất cả kiểm tra đều qua, đánh dấu dữ liệu hợp lệ
      setIsValid(true);
      setErrorMessage(null);
    };

    validateInputs();
  }, [portal_edit, token_edit, webmapId_edit]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      {errorMessage && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: 'rgba(255, 0, 0, 0.8)',
            color: 'white',
            padding: '10px',
            borderRadius: '4px',
            zIndex: 1000,
          }}
        >
          {errorMessage}
          <button
            onClick={() => window.location.href = `${portal_edit}/home/signin.html`}
            style={{ marginLeft: '10px', cursor: 'pointer' }}
          >
            Đăng nhập lại
          </button>
        </div>
      )}
      
      {
      //@ts-ignore 
      isValid && < PageMap options={options} width={width} height={height} />}
    </div>
  );
};