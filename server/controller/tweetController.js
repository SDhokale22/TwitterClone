import { Tweet } from "../models/tweetSchema.js";
import { User } from "../models/userSchema.js";

export const createTweet = async(req, res) => {
    try{
        const {description, id} = req.body;
        if(!description || !id){
            return res.status(401).json({
                message:"Fields are Required",
                success: false
            });
        }; 
        const user = await User.findById(id).select("-password");
        await Tweet.create({
            description,
            userId:id,
            userDetails:user
        });
        return res.status(201).json({
            message: "Tweet created successfully",
            success: true
        })
    }catch(error){
        console.log(error);
    }
}

//delete tweet
export const deleteTweet = async(req, res) => {
    try{
        const {id} = req.params;
        await Tweet.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Tweet Deleted successfully",
            success: true
        })
    }catch(error){
        console.log(error)
    }
}

//like or dislike
export const likeOrDislike = async(req, res) => {
    try{
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
        const tweet = await Tweet.findById(tweetId);
        if(tweet.like.includes(loggedInUserId)){
            await Tweet.findByIdAndUpdate(tweetId, {$pull:{like:loggedInUserId}});
            return res.status(200).json({
                message:"User Dislike your tweet"
            })
        }else{
            await Tweet.findByIdAndUpdate(tweetId, {$push:{like:loggedInUserId}});
            return res.status(200).json({
                message:"User like your tweet"
            })
        }
    }catch(error){
        console.log(error);
    }
}

//alltweet
export const getAllTweet = async(req, res) => {
    try{
        const id = req.params.id;
        const loggedInUser = await User.findById(id);
        const loggedInUserTweets = await Tweet.find({userId:id});
        const followingIUserTweet = await Promise.all(loggedInUser.following.map((otherUsersId) => {
            return Tweet.find({userId:otherUsersId});
        }));
        return res.status(200).json({
            tweets:loggedInUserTweets.concat(...followingIUserTweet)
        })
    }catch(error){
        console.log(error);
    }
}

//getfollowing
export const getFollowingTweets = async(req, res) => {
    try{
        const id = req.params.id;
        const loggedInUser = await User.findById(id);
        const followingIUserTweet = await Promise.all(loggedInUser.following.map((otherUsersId) => {
            return Tweet.find({userId:otherUsersId});
        }));
        return res.status(200).json({
            tweets:[].concat(...followingIUserTweet)
        })
    }catch(error){
        console.log(error);
    }
}


