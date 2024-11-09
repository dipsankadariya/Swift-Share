import express from 'express';
import File from "../models/file.js";

export const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileObject = {
    path: req.file.path,
    name: req.file.originalname,
  };
  
  try {
    const file = await File.create(fileObject);
    res.status(200).json({ path: `https://swift-share-218z.onrender.com/file/${file._id}` });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Error uploading file' });
  }
};

export const getImage = async (req, res) => {
  try {   
    const file = await File.findById(res.params.fileId);
    
    file.downloadCount++;

    await file.save();

    res.download(file.path, file.name);
} catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
}
}