const express = require('express')

const { CloudinaryUpload } = require('../helper/cloudinaryhelper');
const Image = require('../model/Image');
const { image } = require('../Config/cloudinaryconfig');
const cloudinary = require("../Config/cloudinaryconfig")
const UploadController = async (req,res)=>{
    try{

        if(!req.file) return res.status(400).json({
            success : 'failed',
            message : 'path missing'
        })

        const {url,publicId} = await CloudinaryUpload(req.file.path,req.resourceType);

        //store the path in mongo

        const result = await Image.create({
            url ,
            publicId,
            UploadedBy : req.userInfo.userId
        })
        res.status(200).json({
            success : 'success',
            message : 'file uploaded succesfully',
            url ,
            _id : result._id,
            publicId,
            UploadedBy :result.UploadedBy ,
            createdAt : result.timestamp
        })



    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success : 'failed',
            message : 'Something went wrong'
        })
        
    }
}

const DeleteImageController = async(req,res)=>{
    try{
        const imageid = req.params.id

        const getuserid = req.userInfo.userId
        
        
        const imagedetails = await Image.findById(imageid)
        console.log(imagedetails);
        

        if(!imagedetails) return  res.status(404).json({
            success : 'failed',
            message : 'image not found'

        })
        console.log(imagedetails.UploadedBy.toString(),getuserid);
        

        if(imagedetails.UploadedBy.toString()!==getuserid) return res.status(404).json({
            success : 'failed',
            message : 'ur not the one who uploaded this image'
        })

        //delete from cloudinary

        cloudinary.uploader.destroy(imagedetails.publicId)

        //delete from mongodb

        await Image.findByIdAndDelete(imageid)
        res.status(200).json({
            delete: "deleted successfully"
        })
        
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success : 'failed',
            message : 'Something went wrong'
        })
        
    }
}

const fetchimages = async(req,res)=>{
    try{

        const page = parseInt(req.query.page) || 1
        const limit = parseInt (req.query.limit) || 2
        const skip =  (page-1)*limit
        const SortBy = req.query.SortBy || "timestamp"
        const SortOrder = req.query.SortOrder ==="asc" ? 1 : -1
        
        
        const totalImages = await Image.countDocuments()
        const totalpages = Math.ceil (totalImages/limit)
        const SortObj = {}
        SortObj[SortBy] = SortOrder

        const imagesdata = await Image.find().sort(SortObj).skip(skip).limit(limit)

        res.status(200).json({
            page ,
            limit,
            skip,
            totalImages,
            totalpages,
            imagesdata
        })

    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success : 'failed',
            message : 'Something went wrong'
        })
        
        
    }
}

module.exports = {
    UploadController,DeleteImageController,fetchimages
}