package com.rvist.app.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.rvist.app.models.Student
import com.rvist.app.repository.StudentRepository
import kotlinx.coroutines.launch

/**
 * ViewModel for Dashboard Screen
 * Manages UI state and business logic
 */
class DashboardViewModel : ViewModel() {
    
    private val repository = StudentRepository()
    
    private val _students = MutableLiveData<List<Student>>()
    val students: LiveData<List<Student>> = _students
    
    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading
    
    private val _errorMessage = MutableLiveData<String>()
    val errorMessage: LiveData<String> = _errorMessage
    
    init {
        loadStudents()
    }
    
    /**
     * Load students data
     */
    fun loadStudents() {
        viewModelScope.launch {
            _isLoading.value = true
            try {
                val data = repository.getAllStudents()
                _students.value = data
            } catch (e: Exception) {
                _errorMessage.value = "Failed to load students: ${e.message}"
            } finally {
                _isLoading.value = false
            }
        }
    }
    
    /**
     * Refresh data
     */
    fun refresh() {
        loadStudents()
    }
}
