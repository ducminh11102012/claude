#!/usr/bin/env python3
"""
Local Claude.ai clone server with custom API endpoints
Serves static assets and mocks the API endpoints needed by the frontend
"""

import http.server
import socketserver
import json
import os
import re
import sys
from pathlib import Path
from urllib.parse import urlparse, parse_qs
from http import HTTPStatus

PORT = 3000
BASE_DIR = Path(__file__).parent
ASSETS_DIR = BASE_DIR / 'assets-proxy.anthropic.com' / 'claude-ai' / 'v2' / 'assets' / 'v1'
IMAGES_DIR = BASE_DIR / 'claude.ai' / 'images'
HTML_FILE = BASE_DIR / 'claude.ai' / 'new.html'

# Read and cache the HTML template
with open(BASE_DIR / 'index.html', 'r') as f:
    HTML_TEMPLATE = f.read()
HTML_TEMPLATE = HTML_TEMPLATE.replace(
    'https://assets-proxy.anthropic.com/',
    '/assets/'
)
HTML_TEMPLATE = HTML_TEMPLATE.replace(
    'https://api.anthropic.com',
    'http://localhost:3000'
)
HTML_TEMPLATE = HTML_TEMPLATE.replace(
    'https://a-api.anthropic.com',
    'http://localhost:3000'
)
HTML_TEMPLATE = HTML_TEMPLATE.replace(
    'https://claude.ai/api',
    'http://localhost:3000/api'
)
HTML_TEMPLATE = HTML_TEMPLATE.replace(
    'https://claude.ai',
    'http://localhost:3000'
)
HTML_TEMPLATE = HTML_TEMPLATE.replace(
    '"/edge-api/bootstrap/',
    '"/api/bootstrap"'
)
HTML_TEMPLATE = HTML_TEMPLATE.replace(
    '"/manifest.json"',
    '"/manifest.json"'
)
HTML_TEMPLATE = HTML_TEMPLATE.replace(
    '"/favicon.ico"',
    '"/favicon.ico"'
)
HTML_TEMPLATE = HTML_TEMPLATE.replace(
    '"/images/',
    '"/images/'
)

class ClaudeHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(BASE_DIR), **kwargs)
    
    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        
        # API endpoints
        if path == '/api/bootstrap':
            self.send_json_response({
                "success": True,
                "backendPrivateApiUrl": "http://localhost:3000",
                "anthropicApiUrl": "http://localhost:3000",
                "consoleAbsoluteUrl": "http://localhost:3000",
                "claudeAiAbsoluteUrl": "http://localhost:3000",
                "customAgentsAbsoluteUrl": "",
                "websiteBaseUrl": "https://www.anthropic.com",
                "userContentRendererUrl": "https://www.claudeusercontent.com",
                "conwayShellOrigin": "https://conway.claudeusercontent.com",
                "mcpLocalConnectorUrl": "https://www.claudemcpclient.com",
                "mcpAppsSandboxProxyUrl": "https://sandbox.claudemcpcontent.com/mcp_apps",
                "imagineMcpUrl": "https://sandbox.claudemcpcontent.com/imagine_mcp",
                "googleOauthClientId": "1062961139910-l2m55cb9h51u5cuc9c56eb3fevouidh9.apps.googleusercontent.com",
                "stripePublishableKey": "pk_test_dummy",
                "segmentKey": "LKJN8LsLERHEOXkw487o7qCTFOrGPimI",
                "segmentCdnHost": "a-cdn.anthropic.com",
                "segmentApiHost": "a-api.anthropic.com",
                "siftBeaconKey": "99dfa2e716",
                "siftCdnHost": "s-cdn.anthropic.com",
                "arkoseKey": "EEA5F558-D6AC-4C03-B678-AABF639EE69A",
                "arkoseCdnHost": "a-cdn.claude.ai",
                "hcaptchaInvisibleSitekey": "dd2a3340-0654-40d2-a57a-43444e1ecd1c",
                "hcaptchaPartnerOnboardingSitekey": "094c5ae0-9580-4762-8e94-9c1ef9000b0e",
                "hcaptchaPartnerBridgeSitekey": "9fdead64-b148-4084-92de-ae10f94e1d0c",
                "hcaptchaFlowSitekeys": {
                    "claude_web_login": "a8086506-2036-46f4-ae50-00d8be805efa",
                    "aws_marketplace": "326ea26c-fd9e-4eca-a806-aaea5b74caa2",
                    "trust_portal": "6602ba8e-451e-4df2-8486-ed3c1764ba64",
                    "oauth_consent": "91e2a8d8-760e-4422-a0b4-eed6fdc4b26e",
                    "console_login": "963269a8-e87c-4680-8486-015a90141f80"
                },
                "gtagMeasurementId": "AW-16632748715",
                "gtagMccMeasurementId": "AW-11477462985",
                "floodlightId": "DC-15684265",
                "publishedArtifactsBaseUrl": "http://localhost:3000",
                "publishedArtifactsEmbedBaseUrl": "http://localhost:3000",
                "defaultSecureCookies": False,
                "claudeBrowserExtensionClientId": "dae2cad8-15c5-43d2-9046-fcaecc135fa4",
                "claudeBrowserExtensionId": "fcoeoabgfenejglbffodgkkbkcdhcgfn",
                "antOnlyClaudeBrowserExtensionId": "dngcpimnedloihjnnfngkgjoidhnaolf",
                "excelAddInClientId": "966eba67-8b8c-4eae-bbb3-08361d1b9292",
                "iframeAllowedOrigins": [],
                "iframeBridgeAllowedOrigins": [],
                "cicFrameAncestorOrigins": ["chrome-extension://fcoeoabgfenejglbffodgkkbkcdhcgfn"]
            })
            return
        
        elif path == '/api/organizations/discoverable':
            self.send_json_response({"organizations": []})
            return
        
        elif path.startswith('/api/organizations/') and path.endswith('/current_user_access'):
            self.send_json_response({"access": "admin", "organization_uuid": "local-org"})
            return
        
        elif path.startswith('/api/organizations/') and path.endswith('/cowork_settings'):
            self.send_json_response({"settings": {}})
            return
        
        elif path.startswith('/api/organizations/') and '/experiences/claude_web' in path:
            self.send_json_response({"experiences": []})
            return
        
        elif path.startswith('/api/organizations/') and '/marketplaces/list-default-marketplaces' in path:
            self.send_json_response({"marketplaces": []})
            return
        
        elif path.startswith('/api/organizations/') and '/mcp/remote_servers_with_connection' in path:
            self.send_json_response({"servers": []})
            return
        
        elif path.startswith('/api/organizations/') and '/mcp/v2/bootstrap' in path:
            self.send_json_response({"servers": [], "tools": []})
            return
        
        elif path.startswith('/api/organizations/') and '/memory/settings' in path:
            self.send_json_response({"settings": {}})
            return
        
        elif path.startswith('/api/organizations/') and '/notification/channels' in path:
            self.send_json_response({"channels": []})
            return
        
        elif path.startswith('/api/organizations/') and '/pending_domain_claim' in path:
            self.send_json_response({"claim": None})
            return
        
        elif path.startswith('/api/organizations/') and '/plugins/list-plugins' in path:
            self.send_json_response({"plugins": []})
            return
        
        elif path.startswith('/api/organizations/') and '/projects' in path and path.endswith('/projects'):
            self.send_json_response({"projects": []})
            return
        
        elif path.startswith('/api/organizations/') and '/reflections/settings' in path:
            self.send_json_response({"settings": {}})
            return
        
        elif path.startswith('/api/organizations/') and '/skills/list-skills' in path:
            self.send_json_response({"skills": []})
            return
        
        # Root route - serve the main HTML
        elif path == '/' or path == '/new' or path == '/chat' or path.startswith('/chat/'):
            self.send_response(HTTPStatus.OK)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Cache-Control', 'no-cache')
            self.end_headers()
            self.wfile.write(HTML_TEMPLATE.encode('utf-8'))
            return
        
        elif path == '/api/bootstrap/current_user_access':
            self.send_json_response({
                "user": {
                    "uuid": "local-user-1",
                    "email": "local@test.com",
                    "full_name": "Local User",
                    "avatar_url": None,
                    "is_active": True,
                    "created_at": "2024-01-01T00:00:00Z"
                },
                "organization": {
                    "uuid": "local-org",
                    "name": "Local Organization",
                    "role": "admin"
                },
                "access": "admin"
            })
            return
        
        elif path == '/api/organizations/local-org/models':
            self.send_json_response({
                "models": [
                    {"id": "claude-3-opus-20240229", "name": "Claude 3 Opus", "display_name": "Claude 3 Opus"},
                    {"id": "claude-3-sonnet-20240229", "name": "Claude 3 Sonnet", "display_name": "Claude 3 Sonnet"},
                    {"id": "claude-3-haiku-20240307", "name": "Claude 3 Haiku", "display_name": "Claude 3 Haiku"}
                ]
            })
            return
        
        elif path == '/edge-api/client-health/reload-request':
            self.send_json_response({"ok": True})
            return
        
        elif path == '/api/health':
            self.send_json_response({"status": "ok"})
            return
        
        # Static assets
        elif path.startswith('/assets/'):
            asset_path = ASSETS_DIR / path[8:]  # Remove '/assets/'
            if asset_path.exists() and asset_path.is_file():
                self.serve_file(asset_path)
                return
            else:
                self.send_error(HTTPStatus.NOT_FOUND, "Asset not found")
                return
        
        elif path.startswith('/images/'):
            image_path = IMAGES_DIR / path[8:]  # Remove '/images/'
            if image_path.exists() and image_path.is_file():
                self.serve_file(image_path)
                return
            else:
                self.send_error(HTTPStatus.NOT_FOUND, "Image not found")
                return
        
        elif path == '/favicon.ico':
            favicon_path = BASE_DIR / 'claude.ai' / 'favicon.ico'
            if favicon_path.exists():
                self.serve_file(favicon_path)
                return
        
        elif path == '/manifest.json':
            manifest_path = BASE_DIR / 'claude.ai' / 'manifest.json'
            if manifest_path.exists():
                self.serve_file(manifest_path)
                return
        
        # SPA fallback - serve the main HTML for all other routes
        else:
            self.send_response(HTTPStatus.OK)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.end_headers()
            self.wfile.write(HTML_TEMPLATE.encode('utf-8'))
    
    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path
        
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length).decode('utf-8') if content_length > 0 else '{}'
        
        try:
            data = json.loads(body)
        except:
            data = {}
        
        # Chat API - Mock streaming response
        if path.startswith('/api/organizations/') and '/chat' in path and not path.endswith('/chat'):
            # This is a chat message endpoint - stream a response
            self.send_response(HTTPStatus.OK)
            self.send_header('Content-Type', 'text/event-stream')
            self.send_header('Cache-Control', 'no-cache')
            self.send_header('Connection', 'keep-alive')
            self.end_headers()
            
            # Simulate streaming response
            response_text = "This is a mock response from the local server. The actual Claude API is not connected. You can customize this server to connect to any API you want."
            words = response_text.split(' ')
            
            import time
            for i, word in enumerate(words):
                chunk = {
                    "type": "content_block_delta",
                    "delta": {"type": "text_delta", "text": word + " "}
                }
                self.wfile.write(f"data: {json.dumps(chunk)}\n\n".encode())
                self.wfile.flush()
                time.sleep(0.05)
            
            # Send stop signal
            self.wfile.write(f"data: {json.dumps({'type': 'message_stop'})}\n\n".encode())
            self.wfile.flush()
            return
        
        # Create chat session
        elif path.startswith('/api/organizations/') and path.endswith('/chats'):
            self.send_json_response({
                "uuid": f"chat-{int(time.time() * 1000)}",
                "name": "New Chat",
                "created_at": "2024-01-01T00:00:00Z",
                "updated_at": "2024-01-01T00:00:00Z"
            })
            return
        
        # Get chat history
        elif path.startswith('/api/organizations/') and path.endswith('/chats'):
            self.send_json_response({"chats": []})
            return
        
        else:
            self.send_error(HTTPStatus.NOT_FOUND, "API endpoint not found")
    
    def send_json_response(self, data):
        self.send_response(HTTPStatus.OK)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())
    
    def serve_file(self, file_path):
        self.send_response(HTTPStatus.OK)
        
        # Set content type based on extension
        ext = file_path.suffix.lower()
        if ext == '.js':
            self.send_header('Content-Type', 'application/javascript')
        elif ext == '.css':
            self.send_header('Content-Type', 'text/css')
        elif ext == '.woff2':
            self.send_header('Content-Type', 'font/woff2')
        elif ext == '.png':
            self.send_header('Content-Type', 'image/png')
        elif ext == '.svg':
            self.send_header('Content-Type', 'image/svg+xml')
        elif ext == '.ico':
            self.send_header('Content-Type', 'image/x-icon')
        elif ext == '.json':
            self.send_header('Content-Type', 'application/json')
        else:
            self.send_header('Content-Type', 'application/octet-stream')
        
        self.end_headers()
        
        with open(file_path, 'rb') as f:
            self.wfile.write(f.read())
    
    def log_message(self, format, *args):
        # Suppress default log messages
        pass

if __name__ == '__main__':
    import time
    os.chdir(BASE_DIR)
    
    with socketserver.TCPServer(("", PORT), ClaudeHandler) as httpd:
        print(f"Server running at http://localhost:{PORT}")
        print(f"Assets served from /assets")
        print(f"API endpoints mocked at /api/*")
        print("Press Ctrl+C to stop")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped")