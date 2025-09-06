import React, { useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import axios from 'axios';




function Lecture({ lecture, authorization, onUpdate }) {
    const [open, setOpen] = useState(false)
    const [updating, setUpdating] = useState(false)
    const [error, setError] = useState('')
    const [title, setTitle] = useState(lecture.title)
    const [isFree, setIsFree] = useState(lecture.isFree)

    const navigate = useNavigate()

    const deleteLecture = () => {
        const options = {
            method: 'DELETE',
            url: `${import.meta.env.VITE_BACKEND_URL}/api/course/lectures/delete`,
            headers: {
                Authorization: `Bearer ${authorization}`
            },
            data: { lectureId: lecture._id }
        };

        axios.request(options).then(function (response) {
            if (response.data.success) {
                console.log(response.data);
                toast.success('Lecture deleted successfully!')
                onUpdate()
            } else {
                toast.error('Failed to delete lecture!')
            }

        }).catch(function (error) {
            console.error(error);
            toast.error('Failed to delete lecture!')
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const options = {
            method: 'PUT',
            url: `${import.meta.env.VITE_BACKEND_URL}/api/course/lectures/update`,
            headers: {
                Authorization: `Bearer ${authorization}`
            },
            data: { lectureId: lecture._id, title: title, isFree: isFree }
        };

        axios.request(options).then(function (response) {
            if (response.data.success) {
                console.log(response.data);
                toast.success('Lecture updated successfully!')
                setOpen(false)
                onUpdate()
            } else {
                toast.error('Failed to update lecture!')
            }
        }).catch(function (error) {
            console.error(error);
            toast.error('Failed to update lecture!')
        });
    }

    return (
        <Card className="w-full my-3 p-5 flex flex-row justify-between">
            <h1 className='font-semibold'>{lecture.title}</h1>
            <div className="buttons">


                <Dialog open={open} onOpenChange={setOpen} >
                    <DialogTrigger asChild>
                        <Button variant='outline'>
                            <FaPencilAlt /> Edit
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md max-h-full overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Edit Lecture</DialogTitle>
                        </DialogHeader>
                        <div className="flex items-center gap-2">
                            <div className="grid flex-1 gap-2">
                                <form >
                                    <div className="flex flex-col gap-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="title">Lecture Title</Label>
                                            <Input
                                                id="title"
                                                type="text"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="e.g. JavaScript Mastery"
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <label htmlFor="isfreeEdit" className="text-sm font-medium">
                                                Free preview
                                            </label><Switch id="isfreeEdit" checked={isFree}
                                                onCheckedChange={setIsFree} />
                                        </div>
                                        <div className="video-preview">
                                            <video src={lecture.url} className="w-full max-h-60" controls />
                                        </div>
                                        <Button onClick={handleSubmit} className={`w-full mt-3${updating ? 'bg-gray-500 hover:bg-gray-500' : ''}`}>
                                            {updating ? 'Updating Lecture..' : 'Update Lecture'}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="error flex justify-center">
                            {error && <p className='text-red-500'>{error}</p>}
                        </div>

                    </DialogContent>
                </Dialog>



                <Button variant='destructive' className='ml-2' onClick={deleteLecture} type='button'>
                    <MdDelete /> Delete
                </Button>

            </div>
        </Card>
    )
}

export default Lecture