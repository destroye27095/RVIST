package com.rvist.app.features.admin

class AdminMonitoringWall {
    fun getLiveStats(): Map<String, Int> {
        return mapOf(
            "Students_On_Campus" to 1240,
            "Staff_Active" to 85,
            "Pending_Alerts" to 3
        )
    }
}
