package com.rvist.app.models

data class Staff(
    val id: String,
    val name: String,
    val department: String,
    val role: String,
    val email: String,
    val phone: String,
    val attendance: Int,
    val status: String
)
