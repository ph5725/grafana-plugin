import React, { useState, useEffect } from 'react';
import { getBackendSrv } from '@grafana/runtime';
import { Button, Input, Alert } from '@grafana/ui';

interface ArcGISLinkProps {
  grafanaUserId?: string;
}

const ArcGISLink: React.FC<ArcGISLinkProps> = ({ grafanaUserId: propUserId }) => {
  const [arcgisUsername, setArcgisUsername] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isLinked, setIsLinked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [effectiveUserId, setEffectiveUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Cấu hình ArcGIS OAuth
  const clientId = 'YOUR_CLIENT_ID'; // Thay bằng client_id từ ArcGIS Portal
  const redirectUri = 'http://your-grafana-url/api/arcgis/callback'; // Thay bằng redirect_uri của bạn
  const portalUrl = 'https://iotplatform.intelli.com.vn/portal'; // Thay bằng URL của ArcGIS Portal

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        setIsLoading(true);
        const response = await getBackendSrv().get('/api/user');
        const userId = response.id || response.userId || 'default_user_id';
        setEffectiveUserId(userId);
      } catch (error) {
        setEffectiveUserId('default_user_id');
        console.error('Failed to fetch user info:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (effectiveUserId) {
      const checkLinkStatus = async () => {
        try {
          setIsLoading(true);
          const response = await getBackendSrv().get(`/api/arcgis/check-link?grafana_user_id=${effectiveUserId}`);
          setIsLinked(response.isLinked);
          if (response.isLinked) {
            setMessage({ type: 'success', text: 'Tài khoản ArcGIS đã được liên kết.' });
            setToken(response.token); // Giả định API trả về token nếu đã liên kết
          }
        } catch (error) {
          setMessage({ type: 'error', text: 'Không thể kiểm tra trạng thái liên kết.' });
        } finally {
          setIsLoading(false);
        }
      };
      checkLinkStatus();
    }
  }, [effectiveUserId]);

  const handleArcGISLogin = () => {
    if (!effectiveUserId) return;
    setIsLoading(true);
    // Tạo URL OAuth của ArcGIS Portal
    const authUrl = `${portalUrl}/sharing/rest/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&state=${effectiveUserId}`;
    window.location.href = authUrl; // Chuyển hướng đến trang đăng nhập ArcGIS
  };

  const handleLinkAccount = async () => {
    if (!effectiveUserId || !arcgisUsername || !token) {
      setMessage({ type: 'error', text: 'Vui lòng hoàn tất xác thực ArcGIS trước.' });
      return;
    }

    setIsLoading(true);
    try {
      console.log('Linking account with:', { grafana_user_id: effectiveUserId, arcgis_user_id: arcgisUsername, token });
      const response = await getBackendSrv().post('/api/arcgis/link', {
        grafana_user_id: effectiveUserId,
        arcgis_user_id: arcgisUsername,
        token,
      });
      console.log('API response:', response);
      if (response.success) {
        setIsLinked(true);
        setMessage({ type: 'success', text: 'Liên kết tài khoản ArcGIS thành công!' });
      } else {
        setMessage({ type: 'error', text: `Không thể liên kết tài khoản ArcGIS. Lý do: ${response.message || 'Không xác định'}` });
      }
    } catch (error) {
      console.error('Link account error:', error);
      setMessage({ type: 'error', text: 'Lỗi khi liên kết tài khoản.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý callback từ ArcGIS (nếu được gọi lại qua redirect)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    if (code && state) {
      handleTokenExchange(code, state);
    }
  }, []);

  const handleTokenExchange = async (code: string, state: string) => {
    setIsLoading(true);
    try {
      const tokenResponse = await getBackendSrv().post('/api/arcgis/callback', {
        code,
        state,
        client_id: clientId,
        redirect_uri: redirectUri,
        portal_url: portalUrl,
      });
      const newToken = tokenResponse.token; // Giả định backend trả về token
      setToken(newToken);
      setEffectiveUserId(state); // Đảm bảo state khớp với userId
      setMessage({ type: 'success', text: 'Xác thực ArcGIS thành công. Vui lòng nhập username để liên kết.' });
    } catch (error) {
      console.error('Token exchange error:', error);
      setMessage({ type: 'error', text: 'Lỗi khi lấy token từ ArcGIS.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '16px', height: '100%', background: '#f5f5f5' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Liên kết tài khoản ArcGIS</h2>
      
      {message && (
        <Alert title={message.type === 'success' ? 'Thành công' : 'Lỗi'} severity={message.type}>
          {message.text}
        </Alert>
      )}

      {isLinked ? (
        <p style={{ color: '#2ecc71' }}>Tài khoản ArcGIS đã được liên kết với Grafana.</p>
      ) : (
        <>
          <Button onClick={handleArcGISLogin} disabled={isLoading || !effectiveUserId} style={{ marginBottom: '16px' }}>
            {isLoading ? 'Đang xác thực...' : 'Đăng nhập bằng ArcGIS'}
          </Button>

          <div style={{ marginBottom: '16px' }}>
            <Input
              value={arcgisUsername}
              onChange={(e) => setArcgisUsername(e.currentTarget.value)}
              placeholder="Nhập username ArcGIS"
              disabled={isLoading || !token}
            />
          </div>

          <Button onClick={handleLinkAccount} disabled={isLoading || !effectiveUserId || !arcgisUsername || !token}>
            {isLoading ? 'Đang liên kết...' : 'Liên kết tài khoản'}
          </Button>
        </>
      )}
    </div>
  );
};

export default ArcGISLink;