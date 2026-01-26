package com.rvist.app.models

data class Course(
    val id: String,
    val name: String,
    val code: String,
    val department: String,
    val students: Int,
    val instructor: String,
    val credits: Int,
    val schedule: String,
    val status: String
)
