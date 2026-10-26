package com.vibe.social;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.ValueCallback;
import android.content.Intent;
import android.net.Uri;

public class MainActivity extends Activity {
    private WebView webView;
    private ValueCallback<Uri[]> fileCallback;
    private static final int FILE_CHOOSER = 1001;

    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        webView = new WebView(this);
        WebSettings s = webView.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setAllowFileAccess(true);
        webView.setWebViewClient(new WebViewClient());
        webView.setWebChromeClient(new WebChromeClient() {
            @Override public boolean onShowFileChooser(WebView v, ValueCallback<Uri[]> cb, FileChooserParams p) {
                if (fileCallback != null) fileCallback.onReceiveValue(null);
                fileCallback = cb;
                try {
                    Intent i = p.createIntent();
                    startActivityForResult(i, FILE_CHOOSER);
                } catch (Exception e) {
                    if (fileCallback != null) fileCallback.onReceiveValue(null);
                    fileCallback = null;
                    return false;
                }
                return true;
            }
        });
        setContentView(webView);
        // Bump the URL version so WebView requests the current VIBE web app.
        webView.loadUrl("https://rasulov998.github.io/vibe/?v=1.0.8");
    }

    @Override protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == FILE_CHOOSER) {
            if (fileCallback != null) {
                fileCallback.onReceiveValue(WebChromeClient.FileChooserParams.parseResult(resultCode, data));
            }
            fileCallback = null;
        }
        super.onActivityResult(requestCode, resultCode, data);
    }

    @Override public void onBackPressed() {
        if (webView.canGoBack()) webView.goBack();
        else super.onBackPressed();
    }
}
