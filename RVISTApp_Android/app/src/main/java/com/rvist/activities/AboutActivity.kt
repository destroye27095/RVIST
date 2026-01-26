package com.rvist.activities

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.rvist.databinding.ActivityAboutBinding

class AboutActivity : AppCompatActivity() {
    private lateinit var binding: ActivityAboutBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAboutBinding.inflate(layoutInflater)
        setContentView(binding.root)

        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        supportActionBar?.title = "Institutional Profile"
        
        // Content is handled via XML strings references
    }

    override fun onSupportNavigateUp(): Boolean {
        onBackPressed()
        return true
    }
}
