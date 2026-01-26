package com.rvist.app

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.rvist.app.activities.LoginActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login) // Start with Login

        // Redirect to Login
        startActivity(Intent(this, LoginActivity::class.java))
        finish()
    }
}
