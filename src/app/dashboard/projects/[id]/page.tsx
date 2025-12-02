'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db, storage } from '@/lib/firebase';
import { doc, getDoc, collection, addDoc, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Loader2, Upload, FileText, Download, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { format } from 'date-fns';

interface Project {
    id: string;
    title: string;
    clientName: string;
    status: string;
    startDate: any;
    description?: string;
}

interface FileData {
    id: string;
    name: string;
    url: string;
    uploadedBy: string;
    uploadedAt: any;
}

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
    const { user } = useAuth();
    const [project, setProject] = useState<Project | null>(null);
    const [files, setFiles] = useState<FileData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const { toast } = useToast();

    useEffect(() => {
        const fetchProjectAndFiles = async () => {
            if (!user) return;
            setIsLoading(true);
            try {
                // Fetch Project
                const projectDoc = await getDoc(doc(db, 'projects', params.id));
                if (projectDoc.exists()) {
                    setProject({ id: projectDoc.id, ...projectDoc.data() } as Project);
                } else {
                    toast({ variant: 'destructive', title: 'Project not found' });
                }

                // Fetch Files
                const q = query(collection(db, 'files'), where('projectId', '==', params.id), orderBy('uploadedAt', 'desc'));
                const querySnapshot = await getDocs(q);
                const filesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as FileData[];
                setFiles(filesData);

            } catch (error) {
                console.error(error);
                toast({ variant: 'destructive', title: 'Error loading details' });
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjectAndFiles();
    }, [params.id, user, toast]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;

        setIsUploading(true);
        setUploadProgress(0);

        try {
            const storageRef = ref(storage, `projects/${params.id}/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error(error);
                    toast({ variant: 'destructive', title: 'Upload failed' });
                    setIsUploading(false);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                    // Save file metadata to Firestore
                    const newFile = {
                        projectId: params.id,
                        name: file.name,
                        url: downloadURL,
                        uploadedBy: user.email || 'Unknown',
                        uploadedAt: Timestamp.now(),
                    };

                    const docRef = await addDoc(collection(db, 'files'), newFile);
                    setFiles([{ id: docRef.id, ...newFile } as FileData, ...files]);

                    setIsUploading(false);
                    toast({ title: 'File uploaded successfully' });
                }
            );
        } catch (error) {
            console.error(error);
            setIsUploading(false);
            toast({ variant: 'destructive', title: 'Error starting upload' });
        }
    };

    if (isLoading) {
        return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    if (!project) {
        return <div className="p-8">Project not found.</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
                    <p className="text-muted-foreground">Client: {project.clientName}</p>
                </div>
                <Button variant="outline" asChild>
                    <Link href="/dashboard/projects">Back to Projects</Link>
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Project Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-muted-foreground">Status</Label>
                                <p className="font-medium capitalize">{project.status}</p>
                            </div>
                            <div>
                                <Label className="text-muted-foreground">Start Date</Label>
                                <p className="font-medium">
                                    {project.startDate?.seconds ? format(new Date(project.startDate.seconds * 1000), 'PPP') : 'N/A'}
                                </p>
                            </div>
                        </div>
                        {project.description && (
                            <div>
                                <Label className="text-muted-foreground">Description</Label>
                                <p className="mt-1">{project.description}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Files & Assets</CardTitle>
                        <CardDescription>Upload and manage project files.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="file-upload">Upload File</Label>
                            <div className="flex items-center gap-4">
                                <Input id="file-upload" type="file" onChange={handleFileUpload} disabled={isUploading} />
                                {isUploading && <span className="text-sm text-muted-foreground">{Math.round(uploadProgress)}%</span>}
                            </div>
                            {isUploading && <Progress value={uploadProgress} className="h-2" />}
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-sm font-medium">Uploaded Files</h4>
                            {files.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No files uploaded yet.</p>
                            ) : (
                                <div className="space-y-2">
                                    {files.map((file) => (
                                        <div key={file.id} className="flex items-center justify-between p-3 border rounded-md bg-muted/50">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <FileText className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium truncate">{file.name}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {file.uploadedAt?.seconds ? format(new Date(file.uploadedAt.seconds * 1000), 'MMM d, yyyy') : ''} • {file.uploadedBy}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="icon" asChild>
                                                <a href={file.url} target="_blank" rel="noopener noreferrer" download>
                                                    <Download className="h-4 w-4" />
                                                </a>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
