import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaPencilAlt } from "react-icons/fa";
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



function Course({ product }) {
    const [open, setOpen] = useState(false)
    const [error, setError] = useState('')
    const [saving, setSaving] = useState(false)
    const [title, setTitle] = useState(product.title);
    const [subtitle, setSubtitle] = useState(product.subtitle);
    const [description, setDescription] = useState(product.description);
    const [category, setCategory] = useState(product.category);
    const [price, setPrice] = useState(product.price);
    const [whatsLearned, setWhatsLearned] = useState(product.whatsLearned);
    const [language, setLanguage] = useState('English');
    const [image, setImage] = useState(null);
    const [preThumb, setPreThumb] = useState(product.thumbnail)
    const [uploading, setUploading] = useState(false)

    const navigate = useNavigate()




    const handleSubmit=()=>{

    }

    const handleFileUpload=()=>{

    }
    return (
        <Card className="w-full my-3 p-5 flex flex-row justify-between">
            <h1 className='font-semibold'>{product.title}</h1>
            <div className="buttons">


                <Dialog open={open} onOpenChange={setOpen} >
                    <DialogTrigger asChild>
                        <Button variant='outline'>
                            <FaPencilAlt /> Edit
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md max-h-full overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Edit Profile</DialogTitle>
                        </DialogHeader>
                        <div className="flex items-center gap-2">
                            <div className="grid flex-1 gap-2">
                                <form >
                                    <div className="flex flex-col gap-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="title">Course Title</Label>
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
                                            <Label htmlFor="subtitle">Subtitle</Label>
                                            <Input
                                                id="subtitle"
                                                type="text"
                                                value={subtitle}
                                                onChange={(e) => setSubtitle(e.target.value)}
                                                placeholder="e.g. Learn JavaScript from beginner to pro"
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="description">Description</Label>
                                            <Textarea
                                                id="description"
                                                type="text"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder="Write a short course description"
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="category">Category</Label>
                                            <Input
                                                id="category"
                                                type="text"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                placeholder="e.g. Web Development"
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="price">Price ($)</Label>
                                            <Input
                                                id="price"
                                                type="number"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                placeholder="e.g. 29.99"
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="whatsLearned">What will students learn?</Label>
                                            <Textarea
                                                id="whatsLearned"
                                                type="text"
                                                value={whatsLearned}
                                                onChange={(e) => setWhatsLearned(e.target.value)}
                                                placeholder="Describe what the students will learn from this course"
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="language">Course Language</Label>

                                            <Select id="language" value={language} onValueChange={setLanguage}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Language" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="English">English</SelectItem>
                                                    <SelectItem value="Hindi">Hindi</SelectItem>
                                                </SelectContent>
                                            </Select>

                                        </div>
                                        <div className="grid gap-2">
                                            <div className="img-preview">
                                                {image && (
                                                    <div className="img-preview">
                                                        <img src={URL.createObjectURL(image)} alt="Thumbnail Preview" className="w-full h-auto" />
                                                    </div>
                                                )}

                                            </div>
                                            <div className="grid w-full max-w-sm items-center gap-3">
                                                <Label htmlFor="thumbnail">Thumbnail</Label>
                                                <Input id="thumbnail"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => setImage(e.target.files[0])} />
                                            </div>

                                        </div>

                                        <Button onClick={handleSubmit} className={`w-full ${uploading ? 'bg-gray-500 hover:bg-gray-500' : ''}`}>
                                            {uploading ? 'Creating Course..' : 'Create Course'}
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






                <Button variant='secondary'>
                    <FaPlus /> Add Lecture
                </Button>
            </div>
        </Card>
    )
}

export default Course