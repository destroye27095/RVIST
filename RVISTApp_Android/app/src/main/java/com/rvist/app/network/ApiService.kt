package com.rvist.app.network

import com.rvist.app.models.Course
import com.rvist.app.models.Staff
import com.rvist.app.models.Student
import retrofit2.Response
import retrofit2.http.*

/**
 * Retrofit API Service Interface
 * Defines all API endpoints for RVIST backend
 */
interface ApiService {
    
    // Authentication
    @POST("auth/login")
    suspend fun login(
        @Body credentials: Map<String, String>
    ): Response<LoginResponse>
    
    @POST("auth/logout")
    suspend fun logout(): Response<Unit>
    
    // Students
    @GET("students")
    suspend fun getAllStudents(): Response<List<Student>>
    
    @GET("students/{id}")
    suspend fun getStudentById(
        @Path("id") studentId: String
    ): Response<Student>
    
    @POST("students")
    suspend fun createStudent(
        @Body student: Student
    ): Response<Student>
    
    @PUT("students/{id}")
    suspend fun updateStudent(
        @Path("id") studentId: String,
        @Body student: Student
    ): Response<Student>
    
    // Staff
    @GET("staff")
    suspend fun getAllStaff(): Response<List<Staff>>
    
    @GET("staff/{id}")
    suspend fun getStaffById(
        @Path("id") staffId: String
    ): Response<Staff>
    
    // Courses
    @GET("courses")
    suspend fun getAllCourses(): Response<List<Course>>
    
    @GET("courses/{code}")
    suspend fun getCourseByCode(
        @Path("code") courseCode: String
    ): Response<Course>
    
    // Attendance
    @POST("attendance/mark")
    suspend fun markAttendance(
        @Body data: Map<String, String>
    ): Response<AttendanceResponse>
    
    @GET("attendance/student/{id}")
    suspend fun getStudentAttendance(
        @Path("id") studentId: String
    ): Response<List<AttendanceRecord>>
    
    // Fees
    @GET("fees/balance/{id}")
    suspend fun getFeeBalance(
        @Path("id") studentId: String
    ): Response<FeeBalanceResponse>
    
    // Announcements
    @GET("announcements")
    suspend fun getAnnouncements(): Response<List<Announcement>>
    
    // Projects
    @GET("projects")
    suspend fun getProjects(): Response<List<Project>>
    
    // Student Voice (Polls & Feedback)
    @GET("voice/polls")
    suspend fun getActivePolls(): Response<List<Poll>>
    
    @POST("voice/vote")
    suspend fun submitVote(
        @Body vote: Map<String, String>
    ): Response<VoteResponse>
}

// Response Data Classes
data class LoginResponse(
    val success: Boolean,
    val token: String?,
    val user: UserInfo?
)

data class UserInfo(
    val id: String,
    val name: String,
    val role: String
)

data class AttendanceResponse(
    val success: Boolean,
    val message: String
)

data class AttendanceRecord(
    val date: String,
    val status: String,
    val course: String
)

data class FeeBalanceResponse(
    val studentId: String,
    val balance: Double,
    val totalFees: Double,
    val paid: Double
)

data class Announcement(
    val id: String,
    val title: String,
    val content: String,
    val category: String,
    val date: String,
    val priority: String
)

data class Project(
    val id: String,
    val title: String,
    val department: String,
    val team: String,
    val status: String,
    val progress: Int
)

data class Poll(
    val id: String,
    val title: String,
    val options: List<PollOption>,
    val status: String
)

data class PollOption(
    val option: String,
    val votes: Int
)

data class VoteResponse(
    val success: Boolean,
    val message: String
)
