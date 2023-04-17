// create appointments cache

class Cache{
    constructor(date="", time="", location="", subject=""){
        this.date = date;
        this.time = time;
        this.location = location;
        this.subject = subject;
        this.appointment_details = {}
    }
    setAppointment(appointment){
        // store appointment data in variables
        let input_subject = appointment['subject'];
        let input_date = appointment['date'];
        let input_time = appointment['time'];
        let input_location = appointment['location'];

        // yes yes yes
        this.date = input_date;
        this.time = input_time; 
        this.location = input_location;
        this.subject = input_subject;

        // store entire appointment in object
        this.appointment_details.date = input_date;
        this.appointment_details.time = input_time;
        this.appointment_details.location= input_location;
        this.appointment_details.subject = input_subject;
    }
    getAppointment(){
        return this.appointment_details;
    }
    
}

// export module
module.exports = Cache;