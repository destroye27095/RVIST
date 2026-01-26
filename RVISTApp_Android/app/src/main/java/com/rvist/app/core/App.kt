package com.rvist.app.core

import android.app.Application

/**
 * Application class for RVIST@2026 Android App
 * Initializes global app configurations
 */
class App : Application() {
    
    companion object {
        lateinit var instance: App
            private set
        
        const val APP_NAME = "RVIST@2026"
        const val VERSION = "1.0.0"
    }
    
    override fun onCreate() {
        super.onCreate()
        instance = this
        
        // Initialize global configurations
        initializeApp()
    }
    
    private fun initializeApp() {
        // TODO: Initialize analytics, crash reporting, etc.
        // TODO: Setup Retrofit API client
        // TODO: Initialize Room Database
    }
}
