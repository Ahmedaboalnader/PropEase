import React, { useState } from "react";
import { FileInput, Grid, Text } from "@mantine/core";
import { FaPlus } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";
import { MdOutlineInsertDriveFile, MdOutlineInsertPhoto } from "react-icons/md";
import { Controller } from "react-hook-form";
import { CiImageOn } from "react-icons/ci";

const UploadImages = ({
setValue,
control,
error,
defaultImages = [],
inputName = "images",
maxFiles = 11,
accepts = "image/*",
isOnlyImages = false,
label = "Upload Images",
}) => {
const [UploadedImaged, setUploadedImaged] = useState(defaultImages);

const handleDeleteImage = (index) => {
    const newImages = UploadedImaged.filter((_, i) => i !== index);
    setUploadedImaged(newImages);
    setValue(inputName, newImages);
};

const getFilePreview = (file) => {
    if (
    typeof file === "string" ||
    (typeof file === "object" && file?.file_path)
    ) {
    return (
        <div className="relative h-full">
            <img
                src={file?.file_path ? file?.file_path : file}
                alt="Uploaded"
                className="object-cover w-full h-full"
            />
            <div className="absolute bottom-1 right-1 bg-black/50 p-1 rounded-md">
                <MdOutlineInsertPhoto size={16} className="text-white" />
            </div>
        </div>
    );
    }

    if (file instanceof File) {
        if (file.type.startsWith("image/")) {
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
    }
    return null;
};

return (
    <div className="grid grid-cols-1 sm:grid-cols-12 items-start sm:items-center gap-1 sm:gap-4">
        <div className="sm:col-span-2">
            <Text className="mb-2 !font-bold !text-base" size="sm">
                {label}
                <span className="text-[#fa5252] ml-1">*</span>
            </Text>
        </div>

        <div className="col-span-10">
            <Controller
                name={inputName}
                control={control}
                render={({ field }) => (
                    <>
                        <Grid gutter="md">
                            <Grid.Col span={{ base: 6, md: 2, lg: 2 }} sm={6}>
                                <label className="min-w-32 h-32 border-2 border-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                                    <FaPlus className="text-green-500 w-8 h-8" />
                                    <FileInput
                                        {...field}
                                        onChange={(value) => {
                                            const newImages = UploadedImaged?.length
                                                ? [...UploadedImaged, ...value]
                                                : [...value];
                                            setUploadedImaged(newImages);
                                            field.onChange(value);
                                            setValue(inputName, newImages);
                                        }}
                                        accept={accepts}
                                        className="hidden"
                                        multiple
                                    />
                                </label>
                            </Grid.Col>

                            {Array(maxFiles)
                                .fill(null)
                                .map((_, index) => (
                                    <Grid.Col span={{ base: 6, md: 2, lg: 2 }} key={index}>
                                        {UploadedImaged?.[index] ? (
                                            <div
                                                className={`h-32 rounded-lg overflow-hidden border-2 relative group ${
                                                    error?.[index] ? "border-redError" : "border-gray-300"
                                                }`}
                                            >
                                                {getFilePreview(UploadedImaged[index])}
                                                <div
                                                    onClick={() => handleDeleteImage(index)}
                                                    className="absolute top-1 right-1 cursor-pointer !opacity-100 md:!opacity-0 md:group-hover:!opacity-100 transition-opacity duration-200"
                                                >
                                                    <FaWindowClose className="text-gray-300 w-6 h-6" />
                                                </div>
                                            </div>
                                        ) : (
                                            <label className="min-w-32  h-32 border-2 border-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                                                {isOnlyImages ? (
                                                    <CiImageOn className="text-gray-500  w-8 h-8" />
                                                ) : (
                                                    <MdOutlineInsertDriveFile className="text-gray-500  w-8 h-8" />
                                                )}
                                            </label>
                                        )}
                                    </Grid.Col>
                                ))}
                        </Grid>

                        {error && (
                            typeof error === 'string' ? (
                                <p className="text-redError text-sm">{error}</p>
                            ) : Array.isArray(error) ? (
                                error.map((err, i) => (
                                    err?.message && (
                                        <p key={i} className="text-redError text-sm">
                                            {err?.message}
                                        </p>
                                    )
                                ))
                            ) : error?.message ? (
                                <p className="text-redError text-sm">{error.message}</p>
                            ) : null
                        )}

                        <p className="text-redError text-xs">
                            {UploadedImaged?.length > 11 &&
                                "You can upload a maximum of 10 images"}
                        </p>
                    </>
                )}
            />
        </div>
    </div>
);
};

export default UploadImages;