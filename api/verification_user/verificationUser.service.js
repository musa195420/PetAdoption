// services/verificationUser.service.js
const supabase = require("../../config/database");

module.exports = {
  /* ------------------------------------------------------------------ */
  /*  CREATE                                                            */
  /* ------------------------------------------------------------------ */
  createVerificationUser: async (data) => {
    try {
      const { data: result, error } = await supabase
        .from("verification_user")
        .insert([
          {
            user_id:           data.user_id,
            cnic_pic:          data.cnic_pic,
            address:           data.address,
            proof_of_residence:data.proof_of_residence,
            submitted_at:      new Date()
          }
        ])
        .select("*");

      if (error) throw error;
      return result?.[0];
    } catch (err) {
      throw new Error("Failed to create verification: " + err.message);
    }
  },

  /* ------------------------------------------------------------------ */
  /*  READ                                                              */
  /* ------------------------------------------------------------------ */
  getAllVerificationUsers: async () => {
    try {
      const { data, error } = await supabase
        .from("verification_user")
        .select("*");

      if (error) throw error;
      return data;
    } catch (err) {
      throw new Error("Failed to fetch verifications: " + err.message);
    }
  },

  getVerificationUserByUserId: async (userId) => {
    try {
      const { data, error } = await supabase
        .from("verification_user")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      throw new Error("Failed to fetch verification by user: " + err.message);
    }
  },

  /* ------------------------------------------------------------------ */
  /*  UPDATE                                                            */
  /* ------------------------------------------------------------------ */
  updateVerificationUser: async (verificationId, data) => {
    try {
      const updateData = Object.fromEntries(
        Object.entries({
          cnic_pic:           data.cnic_pic,
          address:            data.address,
          proof_of_residence: data.proof_of_residence
        }).filter(([_, v]) => v !== null && v !== undefined)
      );

      if (Object.keys(updateData).length === 0) {
        throw new Error("Nothing to update");
      }

      const { data: result, error } = await supabase
        .from("verification_user")
        .update(updateData)
        .eq("verification_id", verificationId)
        .select("*");

      if (error) throw error;
      return result?.[0];
    } catch (err) {
      throw new Error("Failed to update verification: " + err.message);
    }
  },

  /* ------------------------------------------------------------------ */
  /*  DELETE  (optional)                                                */
  /* ------------------------------------------------------------------ */
  deleteVerificationUser: async (verificationId) => {
    try {
      const { error } = await supabase
        .from("verification_user")
        .delete()
        .eq("verification_id", verificationId);

      if (error) throw error;
      return true;
    } catch (err) {
      throw new Error("Failed to delete verification: " + err.message);
    }
  },

  uploadCnicPicService: async (file, userId) => {
  const fileName = `${userId}/cnic_front_${Date.now()}_${file.originalname}`;

  const { data, error } = await supabase.storage
    .from("verification")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  if (error) {
    console.error("Supabase CNIC upload error:", error);
    throw new Error("CNIC upload failed");
  }

  const { data: publicUrlData } = supabase
    .storage
    .from("verification")
    .getPublicUrl(fileName);

  const imageUrl = publicUrlData.publicUrl;

  const { error: dbError } = await supabase
    .from("verification_user")
    .update({ cnic_pic: imageUrl })
    .eq("user_id", userId);

  if (dbError) {
    console.error("DB update error:", dbError);
    throw new Error("Failed to update CNIC pic URL");
  }

  return imageUrl;
},
uploadProofOfResidenceService: async (file, userId) => {
  const fileName = `${userId}/residence_${Date.now()}_${file.originalname}`;

  const { data, error } = await supabase.storage
    .from("verification")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  if (error) {
    console.error("Supabase proof upload error:", error);
    throw new Error("Proof of residence upload failed");
  }

  const { data: publicUrlData } = supabase
    .storage
    .from("verification")
    .getPublicUrl(fileName);

  const imageUrl = publicUrlData.publicUrl;

  const { error: dbError } = await supabase
    .from("verification_user")
    .update({ proof_of_residence: imageUrl })
    .eq("user_id", userId);

  if (dbError) {
    console.error("DB update error:", dbError);
    throw new Error("Failed to update proof of residence URL");
  }

  return imageUrl;
}

};
