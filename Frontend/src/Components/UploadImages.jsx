import React, { useState, useEffect } from "react";
import { FileInput, Grid, Text } from "@mantine/core";
import { FaPlus } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { Controller } from "react-hook-form";
import { CiImageOn } from "react-icons/ci";

const UploadImages = ({
    control,
    error,
    fileErrors = [],
    defaultImages = [],
    inputName = "files",
    maxFiles = 10,
    accepts = "image/*",
    label = "Upload Images",
    onFileChange,
    onFileRemove,
    currentFileCount = 0
}) => {
    const [uploadedFiles, setUploadedFiles] = useState(defaultImages);

    useEffect(() => {
        if (defaultImages.length > 0) {
            setUploadedFiles(defaultImages?.slice(0, maxFiles));
        }
    }, [defaultImages, maxFiles]);

    const hasFileError = (index) => {
        if (fileErrors && fileErrors?.length > 0) {
            return fileErrors?.some(err => err?.index === index);
        }        
        return error && (error[index] || error.message);
    };

    const getFileErrorMessage = (index) => {
        if (fileErrors && fileErrors?.length > 0) {
            const fileError = fileErrors?.find(err => err?.index === index);
            return fileError ? fileError?.error : null;
        }
        return null;
    };

    const handleFileUpload = (newFiles) => {
        if (!newFiles || newFiles?.length === 0) return;

        const validFiles = Array.from(newFiles)?.filter(file => {
            const isValidType = file?.type?.startsWith('image/');
            const isDuplicate = uploadedFiles.some(uploaded => {
                return uploaded?.name === file?.name && uploaded?.size === file?.size && uploaded?.type === file?.type;
            });
            return isValidType && !isDuplicate;
        });

        if (validFiles.length === 0) return;

        const totalFilesAfterUpload = currentFileCount + validFiles?.length;
        const filesToUpload = totalFilesAfterUpload > maxFiles
            ? validFiles?.slice(0, maxFiles - currentFileCount)
            : validFiles;

        if (filesToUpload?.length > 0) {
            onFileChange(filesToUpload);
            setUploadedFiles(prev => [...prev, ...filesToUpload]);
        }
    };

    const handleDeleteFile = (index) => {
        onFileRemove(index);
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const getFilePreview = (file) => {
        // Handle string URLs (existing images from server)
        if (typeof file === "string") {
            return (
                <div className="relative h-full">
                    <img
                        src={file}
                        alt="Uploaded"
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/50 p-1 rounded-md">
                        <MdOutlineInsertPhoto size={16} className="text-white" />
                    </div>
                </div>
            );
        }

        // Handle File objects (new uploads)
        if (file instanceof File) {
            return (
                <div className="relative h-full">
                    <img
                        src={URL.createObjectURL(file)}
                        alt="Uploaded"
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/50 p-1 rounded-md">
                        <MdOutlineInsertPhoto size={16} className="text-white" />
                    </div>
                </div>
            );
        }

        // Handle objects with file_path (from API response)
        if (file?.file_path) {
            return (
                <div className="relative h-full">
                    <img
                        src={file.file_path}
                        alt="Uploaded"
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/50 p-1 rounded-md">
                        <MdOutlineInsertPhoto size={16} className="text-white" />
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <div>
            <Text className="mb-2 !font-medium text-sm" size="sm">
                {label}
                <span className="text-[#fa5252] ml-1">*</span>
            </Text>

            <Controller
                name={inputName}
                control={control}
                render={() => (
                    <>
                        <Grid gutter="md">
                            <Grid.Col span={{ base: 6, md: 2, lg: 2 }} sm={6}>
                                <label 
                                    className={`min-w-32 h-32 border-2 border-gray-200 rounded-lg flex items-center justify-center cursor-pointer
                                        hover:bg-gray-100 transition ${currentFileCount >= maxFiles ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={(e) => {
                                        if (currentFileCount >= maxFiles) {
                                            e.preventDefault();
                                        }
                                    }}
                                >
                                    <FaPlus className="text-green-500 w-8 h-8" />
                                    <FileInput
                                        onChange={handleFileUpload}
                                        accept={accepts}
                                        className="hidden"
                                        multiple
                                        disabled={currentFileCount >= maxFiles}
                                    />
                                </label>
                            </Grid.Col>

                            {Array(maxFiles)?.fill(null)?.map((_, index) => (
                                <Grid.Col span={{ base: 6, md: 2, lg: 2 }} key={`file-${index}`}>
                                    {uploadedFiles[index] ? (
                                        <div
                                            className={`h-32 rounded-lg overflow-hidden border-2 relative group ${
                                                hasFileError(index) ? "border-redError" : "border-gray-300"
                                            }`}
                                        >
                                            {getFilePreview(uploadedFiles[index])}
                                            <div
                                                onClick={() => handleDeleteFile(index)}
                                                className="absolute top-1 right-1 cursor-pointer !opacity-100 md:!opacity-0 md:group-hover:!opacity-100 transition-opacity duration-200"
                                            >
                                                <FaWindowClose className="text-gray-300 w-6 h-6" />
                                            </div>
                                            {hasFileError(index) && (
                                                <div className="absolute bottom-0 left-0 right-0 bg-redError/80 text-white text-xs p-1 text-center">
                                                    {getFileErrorMessage(index) || "Invalid file"}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="min-w-32 h-32 border-2 border-gray-200 rounded-lg flex items-center justify-center">
                                            <CiImageOn className="text-gray-500 w-8 h-8" />
                                        </div>
                                    )}
                                </Grid.Col>
                            ))}
                        </Grid>

                        {error && (
                            typeof error === 'string' ? (
                                <p className="text-[#fa5252] text-sm ">{error}</p>
                            ) : Array.isArray(error) ? (
                                error?.map((err, i) => (
                                    err?.message && (
                                        <p key={i} className="text-[#fa5252] text-sm">
                                            {err?.message}
                                        </p>
                                    )
                                ))
                            ) : error?.message ? (
                                <p className="text-[#fa5252] text-sm">{error.message}</p>
                            ) : null
                        )}

                        <p className="text-gray-500 text-xs mt-2">
                            {`${uploadedFiles?.length}/${maxFiles} images uploaded`}
                        </p>
                    </>
                )}
            />
        </div>
    );
};

export default UploadImages;