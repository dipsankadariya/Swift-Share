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
    res.status(200).json({ path: `https://swift-share-218z.onrender.com/${file._id}` }); // Changed URL to localhost
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Error uploading file' });
  }
};

export const downloadImage = async (req, res) => {
  try {
    const file = await File.findById(req.params.fileId);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    file.downloadCount++;
    await file.save();

    res.download(file.path, file.name);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Error downloading file' });
  }
};
