import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function TrainingDialog({ training, handleChange}) {

    return(
        <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                value={dayjs(training.date)}
                format="DD.MM.YYYY HH:mm"
                label="Date"
                name="date"
                onChange={(newDate) => handleChange(null, newDate)}
                />
            </LocalizationProvider>
            
            <TextField
             margin="dense"
             label="Duration"
             name="duration"
             fullWidth
             variant="standard"
             value={training.duration}
             onChange={handleChange}
             />
            <TextField
             margin="dense"
             label="Activity"
             name="activity"
             fullWidth
             variant="standard"
             value={training.activity}
             onChange={handleChange}
             />
        </DialogContent>
    );
}

export default TrainingDialog;