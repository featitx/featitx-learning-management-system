const UserModel=require('../model/UserModel')

module.exports.getStudent__controller=async (req,res,next)=>{
    try {
        const studentInfo=await UserModel.find({role:"Student"})
        return res.status(200).json({
            studentInfo
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: "Error occurred"
        })
    }
}


module.exports.getTeacher__controller=async (req,res,next)=>{
    try {
        const teacherInfo=await UserModel.find({role:"Teacher"})
        return res.status(200).json({
            teacherInfo
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: "Error occurred"
        })
    }
}


module.exports.getUsersToAuthorize__controller=async (req,res,next)=>{
    try {
        const userInfoToAuthorize=await UserModel.find({status:0})
        console.log(userInfoToAuthorize)
        return res.status(200).json({
            userInfoToAuthorize
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: "Error occurred"
        })
    }
}


module.exports.updateUsersToAuthorize__controller=async (req,res,next)=>{
    try {
        console.log(req)
        //const userIdObject = mongoose.Types.ObjectId({id:req.body.userId});
        UserModel.findByIdAndUpdate(req.body.userId,{ status: 1 },  { new: true }).then(updatedDoc => {
            console.log(updatedDoc);
            return res.status(200).json({
                updatedDoc
            })
          })
    
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: "Error occurred"
        })
    }
}

module.exports.deleteTeacher__controller = async (req, res, next) => {
    try {
      const { userId } = req.body;
      const user = await UserModel.findOneAndDelete({ _id: userId });
      return res.status(200).json({
        user,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
  };