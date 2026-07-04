import SwiftUI
import WebKit
import UniformTypeIdentifiers

/// SwiftUI から WKWebView を表示するラッパー。
/// Web UI（web-prototype/）はカスタムスキーム `appres://` 経由で配信する。
/// file:// だと fetch/XHR が CORS でブロックされ Live2D モデルを読めないため。
struct WebView: UIViewRepresentable {

    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.setURLSchemeHandler(AssetSchemeHandler(), forURLScheme: AssetSchemeHandler.scheme)
        config.allowsInlineMediaPlayback = true
        config.mediaTypesRequiringUserActionForPlayback = []

        let webView = WKWebView(frame: .zero, configuration: config)
        webView.isOpaque = false
        webView.backgroundColor = .black
        webView.scrollView.backgroundColor = .black
        webView.scrollView.isScrollEnabled = false
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.scrollView.bounces = false

        if #available(iOS 16.4, *) {
            webView.isInspectable = true   // Mac の Safari から実機デバッグ可能
        }

        if let url = URL(string: "\(AssetSchemeHandler.scheme)://local/index.html") {
            webView.load(URLRequest(url: url))
        }
        return webView
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {}
}

/// アプリバンドル内の `web-prototype/` を appres:// スキームで配信するハンドラ。
final class AssetSchemeHandler: NSObject, WKURLSchemeHandler {
    static let scheme = "appres"

    /// フォルダ参照で同梱された Web ルート
    private let root = Bundle.main.bundleURL.appendingPathComponent("web-prototype", isDirectory: true)

    func webView(_ webView: WKWebView, start task: WKURLSchemeTask) {
        guard let url = task.request.url else {
            task.didFailWithError(NSError(domain: Self.scheme, code: -1))
            return
        }

        // appres://local/<path>
        var path = url.path
        if path.hasPrefix("/") { path.removeFirst() }
        if path.isEmpty { path = "index.html" }

        // パーセントエンコードされた日本語ファイル名を復元
        let decoded = path.removingPercentEncoding ?? path
        let fileURL = root.appendingPathComponent(decoded)

        guard let data = try? Data(contentsOf: fileURL) else {
            let resp = HTTPURLResponse(url: url, statusCode: 404,
                                       httpVersion: "HTTP/1.1", headerFields: nil)!
            task.didReceive(resp)
            task.didFinish()
            return
        }

        let headers = [
            "Content-Type": Self.mimeType(for: fileURL.pathExtension),
            "Access-Control-Allow-Origin": "*",
            "Content-Length": "\(data.count)"
        ]
        let resp = HTTPURLResponse(url: url, statusCode: 200,
                                   httpVersion: "HTTP/1.1", headerFields: headers)!
        task.didReceive(resp)
        task.didReceive(data)
        task.didFinish()
    }

    func webView(_ webView: WKWebView, stop task: WKURLSchemeTask) {}

    static func mimeType(for ext: String) -> String {
        switch ext.lowercased() {
        case "html", "htm": return "text/html; charset=utf-8"
        case "css":         return "text/css; charset=utf-8"
        case "js", "mjs":   return "text/javascript; charset=utf-8"
        case "json":        return "application/json; charset=utf-8"
        case "png":         return "image/png"
        case "jpg", "jpeg": return "image/jpeg"
        case "webp":        return "image/webp"
        case "svg":         return "image/svg+xml"
        case "moc3":        return "application/octet-stream"
        case "wav":         return "audio/wav"
        case "mp3":         return "audio/mpeg"
        default:
            if let type = UTType(filenameExtension: ext), let mt = type.preferredMIMEType {
                return mt
            }
            return "application/octet-stream"
        }
    }
}
