const supabase = require("../../config/database");

module.exports = {
  /* ─────────────  C  ───────────── */
  createVerificationMeetup: async (data) => {
    const { data: result, error } = await supabase
      .from("verification_meetup")
      .insert([data])
      .select();

    if (error) throw new Error(error.message);
    return result;
  },

  /* ─────────────  R  ───────────── */
  getVerificationMeetups: async () => {
    const columns = [
      'meetup_id',
      'adopter_verification_status',
      'payment_status',
      'application_id',
      'payment_id',
      'application_id',
      'verification_id'

    ].join(',');

    const { data, error } = await supabase
      .from('verification_meetup')
      .select(columns);

    if (error) throw new Error(error.message);
    return data;
  },

  getVerificationMeetupById: async (meetup_id) => {
    const { data, error } = await supabase
      .from("verification_meetup")
      .select(`
        meetup_id,
        adopter_verification_status,
        payment_status,
        application_id,
        payment_id,
       
      application_id,
      verification_id
      `)
      .eq("meetup_id", meetup_id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  /* ─────────────  U  ───────────── */
  updateVerificationMeetup: async (data) => {
    const { meetup_id, ...fieldsToUpdate } = data;

    const filteredFields = Object.fromEntries(
      Object.entries(fieldsToUpdate).filter(
        ([_, v]) => v !== null && v !== undefined
      )
    );

    const { data: result, error } = await supabase
      .from("verification_meetup")
      .update(filteredFields)
      .eq("meetup_id", meetup_id)
      .select();

    if (error) throw new Error(error.message);
    return result;
  },

  /* ─────────────  D  ───────────── */
  deleteVerificationMeetup: async (meetup_id) => {
    const { data, error } = await supabase
      .from("verification_meetup")
      .delete()
      .eq("meetup_id", meetup_id);

    if (error) throw new Error(error.message);
    return data;
  },
};
