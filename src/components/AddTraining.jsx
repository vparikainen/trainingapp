import { useState } from "react";
import dayjs from "dayjs";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TrainingDialog from "./TrainingDialog";

export default function AddTraining({ fetchTrainings, customerLink }) {
    const [training, setTraining] = useState({
        date: dayjs(new Date().toISOString()),
        duration: 0,
        activity: "",
        customer: customerLink,
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e, newDate = null) => {
        const { name, value } = e?.target || {};
        if (name === 'date' && newDate) {
            const formattedDate = newDate.toISOString();
            setTraining({ ...training, [name]: formattedDate });
        } else if (name) {
            setTraining({ ...training, [name]: value });
        }
    };

    const saveTraining = () => {
        fetch(import.meta.env.VITE_API_URL + `/api/trainings/`, {
            method: "POST",
            headers: { "content-type":"application/json"},
            body: JSON.stringify(training)
        })
        .then(response => {
            if (!response.ok) throw new Error("Error when adding training: " + response.statusText);

            if (typeof fetchTrainings === "function") {
                
                fetchTrainings();
            }
        })
        .catch(err => console.error(err));
        handleClose();
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>
                Add Training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Training</DialogTitle>
                <TrainingDialog training={training} handleChange={handleChange} />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={saveTraining}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}