const supabase = require("../../config/database");

module.exports = {
    createSecureMeetup: async (data) => {
        try {
            const { data: result, error } = await supabase
                .from("securemeetup")
                .insert([
                    {
                        meetup_id: data.meetup_id,
                        proof_pic_url: data.proof_pic_url,
                        adopter_id_front_url: data.adopter_id_front_url,
                        adopter_id_back_url: data.adopter_id_back_url,
                        phone_number: data.phone_number,
                        current_address: data.current_address,
                        time: data.time,
                        submitted_by: data.submitted_by
                    }
                ]);
            if (error) throw error;
            return result;
        } catch (err) {
            throw new Error(err.message);
        }
    },

    getAllSecureMeetups: async () => {
        try {
            const { data: result, error } = await supabase
                .from("securemeetup")
                .select("*");
            if (error) throw error;
            return result;
        } catch (err) {
            throw new Error(err.message);
        }
    },

    getSecureMeetupById: async (secure_meetup_id) => {
        try {
            const { data: result, error } = await supabase
                .from("securemeetup")
                .select("*")
                .eq("secure_meetup_id", secure_meetup_id)
                .single(); // To fetch a single row
            if (error) throw error;
            return result;
        } catch (err) {
            throw new Error(err.message);
        }
    },

    updateSecureMeetup: async (data) => {
        try {
            const { secure_meetup_id, ...updateData } = data;
            const { data: result, error } = await supabase
                .from("securemeetup")
                .update(updateData)
                .eq("secure_meetup_id", secure_meetup_id);
            if (error) throw error;
            return result;
        } catch (err) {
            throw new Error(err.message);
        }
    },

    deleteSecureMeetup: async (secure_meetup_id) => {
        try {
            const { data: result, error } = await supabase
                .from("securemeetup")
                .delete()
                .eq("secure_meetup_id", secure_meetup_id);
            if (error) throw error;
            return result;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    uploadSecureMeetupImages: async (files, meetupId) => {
        try {
            const uploadFile = async (file, fileName) => {
                const path = `${meetupId}/${Date.now()}_${fileName}`;
                const { data, error } = await supabase
                    .storage
                    .from('secure')
                    .upload(path, file.buffer, {
                        contentType: file.mimetype,
                        upsert: true,
                    });
    
                if (error) {
                    console.error("Supabase upload error:", error);
                    throw new Error("Supabase upload failed");
                }
    
                const { data: publicUrlData } = supabase
                    .storage
                    .from('secure')
                    .getPublicUrl(path);
    
                return publicUrlData.publicUrl;
            };
    
            const updateData = {};
    
            if (files.proof_pic && files.proof_pic[0]) {
                const proofPicUrl = await uploadFile(files.proof_pic[0], files.proof_pic[0].originalname);
                updateData.proof_pic_url = proofPicUrl;
            }
    
            if (files.adopter_id_front && files.adopter_id_front[0]) {
                const adopterIdFrontUrl = await uploadFile(files.adopter_id_front[0], files.adopter_id_front[0].originalname);
                updateData.adopter_id_front_url = adopterIdFrontUrl;
            }
    
            if (files.adopter_id_back && files.adopter_id_back[0]) {
                const adopterIdBackUrl = await uploadFile(files.adopter_id_back[0], files.adopter_id_back[0].originalname);
                updateData.adopter_id_back_url = adopterIdBackUrl;
            }
    
            // Now only update if there is at least one uploaded file
            if (Object.keys(updateData).length === 0) {
                throw new Error("No valid images provided to upload.");
            }
    
            // Update the securemeetup table
            const { error: dbError } = await supabase
                .from('securemeetup')
                .update(updateData)
                .eq('meetup_id', meetupId);
    
            if (dbError) {
                console.error("Supabase DB update error:", dbError);
                throw new Error("Failed to update secure meetup image URLs");
            }
    
            return updateData; // Return only uploaded images' URLs
        } catch (err) {
            throw new Error(err.message);
        }
    },
    
};
