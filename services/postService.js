import { supabase } from "../lib/superbase";
import { uploadFile } from "./imageService";

export const createOrUpdataPost = async  ()=>{
     try {
        //upload image
        if(post.file && typeof post.file =='object'){
            let isImage = post?.file?.type=='image';
            let folderName = isImage? 'postImages':'postVideos';
            let fileResult  = await uploadFile(folderName, post?.file?.uri, isImage)
            if(fileResult.success){
                post.file = fileResult.data
            }
            else{
                return {success:false, message:"Could not upload file"}
            }

        }
        const {data, error } = await supabase
        .from('posts')
        .upsert(post)
        .select()
        .single()
        if(error){
            console.log("Create post Error ", error)
            return {success:false, message:"Coould not create post "}
        }
        return {success:true, data:data}
     } catch (error) {
        console.log("Create post Error ", error)
        return {success:false, message:"Coould not create post "}
        
     }
}