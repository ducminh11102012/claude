export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // =========================================================================
    // 1. XỬ LÝ ENDPOINT /v1/models ĐỂ CLAUDE CODE TỰ SCAN MODEL
    // =========================================================================
    if (request.method === "GET" && url.pathname.endsWith("/v1/models")) {
      const modelsList = {
        data: [
          { id: "claude-opus-4-7", object: "model", created: 1710000000, owned_by: "anthropic" },
          { id: "claude-sonnet-4-5", object: "model", created: 1710000000, owned_by: "anthropic" },
          { id: "claude-sonnet-4-6", object: "model", created: 1710000000, owned_by: "anthropic" },
          { id: "claude-haiku-4-5-20251001", object: "model", created: 1710000000, owned_by: "anthropic" }
        ]
      };
      return new Response(JSON.stringify(modelsList), {
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    // Cấu hình hỗ trợ CORS OPTIONS nếu Claude Code chạy kiểm tra môi trường
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "*"
        }
      });
    }

    // =========================================================================
    // 2. XỬ LÝ ENDPOINT /v1/messages (GỬI TIN NHẮN CHAT)
    // =========================================================================
    if (request.method === "POST" && url.pathname.endsWith("/v1/messages")) {
      try {
        const body = await request.json();
        const incomingModel = body.model;

        // Tiến hành đổi Model ID từ Claude sang Model tương ứng của freeinference
        let targetModel = incomingModel; 

        if (incomingModel.includes("claude-opus-4-7")) {
          targetModel = "minimax-m3";
        } else if (incomingModel.includes("claude-sonnet-4-5")) {
          targetModel = "qwen3.6-35b";
        } else if (incomingModel.includes("claude-sonnet-4-6")) {
          targetModel = "glm-5.1";
        } else if (incomingModel.includes("claude-haiku-4-5-20251001") || incomingModel.includes("claude-haiku")) {
          targetModel = "glm-5-turbo";
        }

        // Ghi đè lại model đích
        body.model = targetModel;

        // ĐƯỜNG DẪN GỐC ANTHROPIC COMPATIBLE CỦA FREEINFERENCE
        const FREE_INFERENCE_URL = "https://freeinference.org";

        // Tạo headers mới dựa trên request cũ
        const modifiedHeaders = new Headers(request.headers);
        modifiedHeaders.set("Content-Type", "application/json");
        
        // CHÈN THẲNG API KEY CỦA BẠN VÀO HEADER X-API-KEY GỬI ĐI
        modifiedHeaders.set("x-api-key", "hyi-UMcZxdDFRwoOO5J8jupeKkj1n6Fxspc5Q8Mu2jKtlcU");

        // Forward request thẳng sang FreeInference (Giữ nguyên tính năng Stream)
        const response = await fetch(FREE_INFERENCE_URL, {
          method: "POST",
          headers: modifiedHeaders,
          body: JSON.stringify(body)
        });

        return response;

      } catch (error) {
        return new Response(JSON.stringify({ error: { type: "proxy_error", message: error.message } }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    return new Response("Not Found", { status: 404 });
  }
};
