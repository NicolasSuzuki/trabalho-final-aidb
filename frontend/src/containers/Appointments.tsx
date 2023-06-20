import { useEffect, useState } from "react"
import { getPetsAppointments } from "../api/pet"
import AppointmentsCMP from "../components/Appointments"

const Appointments = () => {
    const [appointments, setAppointments] = useState<any>({})
    useEffect(() => {
        getPetsAppointments().then(setAppointments)
    }, [])
    return <AppointmentsCMP allAppointments={appointments} />
}

export default Appointments