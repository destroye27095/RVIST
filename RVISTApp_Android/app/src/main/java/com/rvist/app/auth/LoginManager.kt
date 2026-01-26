package com.rvist.app.auth

class LoginManager {
    fun validate(user: String, pass: String): Boolean {
        // Mock authentication for RVIST logic
        // Rules: Password 8-16 chars
        if (pass.length in 8..16) {
            return true
        }
        return false
    }
}
