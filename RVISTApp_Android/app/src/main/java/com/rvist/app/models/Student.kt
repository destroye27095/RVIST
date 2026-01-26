package com.rvist.app.models

data class Student(
    val id: String,
    val name: String,
    val course: String,
    val year: Int,
    val feeBalance: Double,
    val attendance: Int,
    val status: String,
    val email: String = "",
    val phone: String = "",
    val nationalId: String = ""
)
