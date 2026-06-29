const DEFAULT_API_URL = 'http://localhost:5000/api/v1';

function normalizeUrl(value: string) {
    return value.replace(/\/$/, '');
}

export function getApiBaseUrl() {
    const configuredUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

    if (!configuredUrl) {
        return DEFAULT_API_URL;
    }

    const normalizedUrl = normalizeUrl(configuredUrl);
    return normalizedUrl.endsWith('/api/v1') ? normalizedUrl : `${normalizedUrl}/api/v1`;
}

export function getSocketBaseUrl() {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL?.trim();

    if (socketUrl) {
        return normalizeUrl(socketUrl);
    }

    const apiBaseUrl = getApiBaseUrl();
    return apiBaseUrl.replace(/\/api\/v1$/, '');
}