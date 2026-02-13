package com.rvist

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.rvist.activities.LoginActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Redirect to WebView Portal
        startActivity(Intent(this, com.rvist.activities.WebViewActivity::class.java))
        finish()
    }
}
