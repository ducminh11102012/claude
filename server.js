const express = require('express');
const cors = require('cors');
const path = require('path');
const { WebSocketServer } = require('ws');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static assets from the downloaded folder
app.use('/assets', express.static(path.join(__dirname, 'assets-proxy.anthropic.com/claude-ai/v2/assets/v1')));

// Serve images
app.use('/images', express.static(path.join(__dirname, 'claude.ai/images')));
app.use('/favicon.ico', express.static(path.join(__dirname, 'claude.ai/favicon.ico')));
app.use('/manifest.json', express.static(path.join(__dirname, 'claude.ai/manifest.json')));

// API Mock Endpoints

// Bootstrap config - returns the config the frontend expects
app.get('/api/bootstrap', (req, res) => {
  res.json({
    success: true,
    backendPrivateApiUrl: 'http://localhost:3000',
    anthropicApiUrl: 'http://localhost:3000',
    consoleAbsoluteUrl: 'http://localhost:3000',
    claudeAiAbsoluteUrl: 'http://localhost:3000',
    customAgentsAbsoluteUrl: '',
    websiteBaseUrl: 'https://www.anthropic.com',
    userContentRendererUrl: 'https://www.claudeusercontent.com',
    conwayShellOrigin: 'https://conway.claudeusercontent.com',
    mcpLocalConnectorUrl: 'https://www.claudemcpclient.com',
    mcpAppsSandboxProxyUrl: 'https://sandbox.claudemcpcontent.com/mcp_apps',
    imagineMcpUrl: 'https://sandbox.claudemcpcontent.com/imagine_mcp',
    googleOauthClientId: '1062961139910-l2m55cb9h51u5cuc9c56eb3fevouidh9.apps.googleusercontent.com',
    stripePublishableKey: 'pk_test_dummy',
    segmentKey: 'LKJN8LsLERHEOXkw487o7qCTFOrGPimI',
    segmentCdnHost: 'a-cdn.anthropic.com',
    segmentApiHost: 'a-api.anthropic.com',
    siftBeaconKey: '99dfa2e716',
    siftCdnHost: 's-cdn.anthropic.com',
    arkoseKey: 'EEA5F558-D6AC-4C03-B678-AABF639EE69A',
    arkoseCdnHost: 'a-cdn.claude.ai',
    hcaptchaInvisibleSitekey: 'dd2a3340-0654-40d2-a57a-43444e1ecd1c',
    hcaptchaPartnerOnboardingSitekey: '094c5ae0-9580-4762-8e94-9c1ef9000b0e',
    hcaptchaPartnerBridgeSitekey: '9fdead64-b148-4084-92de-ae10f94e1d0c',
    hcaptchaFlowSitekeys: {
      claude_web_login: 'a8086506-2036-46f4-ae50-00d8be805efa',
      aws_marketplace: '326ea26c-fd9e-4eca-a806-aaea5b74caa2',
      trust_portal: '6602ba8e-451e-4df2-8486-ed3c1764ba64',
      oauth_consent: '91e2a8d8-760e-4422-a0b4-eed6fdc4b26e',
      console_login: '963269a8-e87c-4680-8486-015a90141f80'
    },
    gtagMeasurementId: 'AW-16632748715',
    gtagMccMeasurementId: 'AW-11477462985',
    floodlightId: 'DC-15684265',
    publishedArtifactsBaseUrl: 'http://localhost:3000',
    publishedArtifactsEmbedBaseUrl: 'http://localhost:3000',
    defaultSecureCookies: false,
    claudeBrowserExtensionClientId: 'dae2cad8-15c5-43d2-9046-fcaecc135fa4',
    claudeBrowserExtensionId: 'fcoeoabgfenejglbffodgkkbkcdhcgfn',
    antOnlyClaudeBrowserExtensionId: 'dngcpimnedloihjnnfngkgjoidhnaolf',
    excelAddInClientId: '966eba67-8b8c-4eae-bbb3-08361d1b9292',
    iframeAllowedOrigins: [],
    iframeBridgeAllowedOrigins: [],
    cicFrameAncestorOrigins: ['chrome-extension://fcoeoabgfenejglbffodgkkbkcdhcgfn']
  });
});

// Organizations bootstrap - return mock org data
app.get('/api/organizations/discoverable', (req, res) => {
  res.json({ organizations: [] });
});

app.get('/api/organizations/*/current_user_access', (req, res) => {
  res.json({ access: 'admin', organization_uuid: 'local-org' });
});

app.get('/api/organizations/*/cowork_settings', (req, res) => {
  res.json({ settings: {} });
});

app.get('/api/organizations/*/experiences/claude_web', (req, res) => {
  res.json({ experiences: [] });
});

app.get('/api/organizations/*/marketplaces/list-default-marketplaces', (req, res) => {
  res.json({ marketplaces: [] });
});

app.get('/api/organizations/*/mcp/remote_servers_with_connection', (req, res) => {
  res.json({ servers: [] });
});

app.get('/api/organizations/*/mcp/v2/bootstrap', (req, res) => {
  res.json({ servers: [], tools: [] });
});

app.get('/api/organizations/*/memory/settings', (req, res) => {
  res.json({ settings: {} });
});

app.get('/api/organizations/*/notification/channels', (req, res) => {
  res.json({ channels: [] });
});

app.get('/api/organizations/*/pending_domain_claim', (req, res) => {
  res.json({ claim: null });
});

app.get('/api/organizations/*/plugins/list-plugins', (req, res) => {
  res.json({ plugins: [] });
});

app.get('/api/organizations/*/projects', (req, res) => {
  res.json({ projects: [] });
});

app.get('/api/organizations/*/reflections/settings', (req, res) => {
  res.json({ settings: {} });
});

app.get('/api/organizations/*/skills/list-skills', (req, res) => {
  res.json({ skills: [] });
});

// Auth / user endpoints
app.get('/api/bootstrap/current_user_access', (req, res) => {
  res.json({
    user: {
      uuid: 'local-user-1',
      email: 'local@test.com',
      full_name: 'Local User',
      avatar_url: null,
      is_active: true,
      created_at: new Date().toISOString()
    },
    organization: {
      uuid: 'local-org',
      name: 'Local Organization',
      role: 'admin'
    },
    access: 'admin'
  });
});

// Chat API - Mock responses
app.post('/api/organizations/*/chat', (req, res) => {
  const { messages, model, system } = req.body;
  
  // Stream response
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // Simulate streaming response
  const responseText = "This is a mock response from the local server. The actual Claude API is not connected. You can customize this server to connect to any API you want.";
  const words = responseText.split(' ');
  
  let index = 0;
  const interval = setInterval(() => {
    if (index < words.length) {
      const chunk = {
        type: 'content_block_delta',
        delta: { type: 'text_delta', text: words[index] + ' ' }
      };
      res.write(`data: ${JSON.stringify(chunk)}\n\n`);
      index++;
    } else {
      res.write(`data: ${JSON.stringify({ type: 'message_stop' })}\n\n`);
      res.end();
      clearInterval(interval);
    }
  }, 50);
  
  req.on('close', () => clearInterval(interval));
});

// Create chat session
app.post('/api/organizations/*/chats', (req, res) => {
  res.json({
    uuid: 'chat-' + Date.now(),
    name: 'New Chat',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });
});

// Get chat history
app.get('/api/organizations/*/chats', (req, res) => {
  res.json({ chats: [] });
});

// Models endpoint
app.get('/api/organizations/*/models', (req, res) => {
  res.json({
    models: [
      { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus', display_name: 'Claude 3 Opus' },
      { id: 'claude-3-sonnet-20240229', name: 'Claude 3 Sonnet', display_name: 'Claude 3 Sonnet' },
      { id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku', display_name: 'Claude 3 Haiku' }
    ]
  });
});

// Health check
app.get('/edge-api/client-health/reload-request', (req, res) => {
  res.json({ ok: true });
});

// API health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve the main HTML file for all other routes (SPA fallback)
app.get('*', (req, res) => {
  // Skip API routes
  if (req.path.startsWith('/api/') || req.path.startsWith('/edge-api/') || req.path.startsWith('/assets/') || req.path.startsWith('/images/')) {
    return res.status(404).json({ error: 'Not found' });
  }
  
  // Read and modify the HTML to use local assets
  const fs = require('fs');
  const htmlPath = path.join(__dirname, 'claude.ai/new.html');
  let html = fs.readFileSync(htmlPath, 'utf-8');
  
  // Replace external asset URLs with local ones
  html = html.replace(/https:\/\/assets-proxy\.anthropic\.com\/claude-ai\/v2\/assets\/v1\//g, '/assets/');
  html = html.replace(/https:\/\/assets-proxy\.anthropic\.com\//g, '/assets/');
  
  // Replace API endpoints to local
  html = html.replace(/https:\/\/api\.anthropic\.com/g, 'http://localhost:3000');
  html = html.replace(/https:\/\/a-api\.anthropic\.com/g, 'http://localhost:3000');
  html = html.replace(/https:\/\/claude\.ai\/api/g, 'http://localhost:3000/api');
  html = html.replace(/https:\/\/claude\.ai/g, 'http://localhost:3000');
  
  // Replace bootstrap URL
  html = html.replace(/"\/edge-api\/bootstrap\/[^"]+"/g, '"/api/bootstrap"');
  
  // Fix manifest and favicon paths
  html = html.replace(/"\/manifest\.json"/g, '"/manifest.json"');
  html = html.replace(/"\/favicon\.ico"/g, '"/favicon.ico"');
  html = html.replace(/"\/images\//g, '"/images/');
  
  res.send(html);
});

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Assets served from /assets`);
  console.log(`API endpoints mocked at /api/*`);
});

// WebSocket server for real-time features (optional)
const wss = new WebSocketServer({ server });
wss.on('connection', (ws) => {
  console.log('WebSocket connected');
  ws.on('message', (message) => {
    console.log('WS Message:', message.toString());
  });
});