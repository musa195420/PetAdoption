const supabase = require("../../config/database");

module.exports = {
  createMeetup: async (data) => {
    const { data: result, error } = await supabase
      .from("meetuprequest")
      .insert([data])
      .select();

    if (error) throw new Error(error.message);
    return result;
  },

  getMeetups: async () => {
    const { data, error } = await supabase.from("meetuprequest").select(`
            meetup_id,
            pet_id,
            donor_id,
            adopter_id,
            location,
            time,
            created_at,
            is_accepted_by_donor,
            is_accepted_by_adopter,
            adopter:adopter_id ( name ),
            donor:donor_id ( name ),
            pet ( name )
          `);

    if (error) throw new Error(error.message);

    return data.map((meetup) => ({
      meetup_id: meetup.meetup_id,
      pet_id: meetup.pet_id,
      donor_id: meetup.donor_id,
      adopter_id: meetup.adopter_id,
      location: meetup.location,
      time: meetup.time,
      is_accepted_by_donor: meetup.is_accepted_by_donor,
      is_accepted_by_adopter: meetup.is_accepted_by_adopter,
      created_at: meetup.created_at,
      adopter_name: meetup.adopter?.name || null,
      donor_name: meetup.donor?.name || null,
      pet_name: meetup.pet?.name || null,
    }));
  },

  getMeetupById: async (meetup_id) => {
    const { data, error } = await supabase
      .from("meetuprequest")
      .select(
        `
              meetup_id,
              pet_id,
              donor_id,
              adopter_id,
              location,
              latitude,
              longitude,
              time,
               rejection_reason,
              add_verification,
              created_at,
               is_accepted_by_donor,
            is_accepted_by_adopter,
              adopter:adopter_id ( name ),
              donor:donor_id ( name ),
              pet ( name )
            `
      )
      .eq("meetup_id", meetup_id)
      .single();

    if (error) throw new Error(error.message);

    return {
      meetup_id: data.meetup_id,
      pet_id: data.pet_id,
      donor_id: data.donor_id,
      adopter_id: data.adopter_id,
      location: data.location,
      latitude: data.latitude,
      longitude: data.longitude,
      time: data.time,
      rejection_reason: data.rejection_reason,
      add_verification: data.add_verification,
      is_accepted_by_donor: data.is_accepted_by_donor,
      is_accepted_by_adopter: data.is_accepted_by_adopter,
      created_at: data.created_at,
      adopter_name: data.adopter?.name || null,
      donor_name: data.donor?.name || null,
      pet_name: data.pet?.name || null,
    };
  },

  getMeetupsByUser: async (user_id) => {
    const { data, error } = await supabase
      .from("meetuprequest")
      .select(
        `
          meetup_id,
          pet_id,
          donor_id,
          adopter_id,
          location,
          latitude,
          longitude,
          time,
          created_at,
           is_accepted_by_donor,
            is_accepted_by_adopter,
           rejection_reason,
              add_verification,
          adopter:adopter_id ( name ),
          donor:donor_id ( name ),
          pet ( name )
        `
      )
      .or(`donor_id.eq.${user_id},adopter_id.eq.${user_id}`);

    if (error) throw new Error(error.message);

    return data.map((meetup) => ({
      meetup_id: meetup.meetup_id,
      pet_id: meetup.pet_id,
      donor_id: meetup.donor_id,
      adopter_id: meetup.adopter_id,
      location: meetup.location,
      latitude: meetup.latitude,
      longitude: meetup.longitude,
      time: meetup.time,
      created_at: meetup.created_at,
      is_accepted_by_donor: meetup.is_accepted_by_donor,
      is_accepted_by_adopter: meetup.is_accepted_by_adopter,
      rejection_reason: meetup.rejection_reason,
      add_verification: meetup.add_verification,
      adopter_name: meetup.adopter?.name || null,
      donor_name: meetup.donor?.name || null,
      pet_name: meetup.pet?.name || null,
    }));
  },

  // ADD this to the export list at the bottom ↓
  getMeetupBetweenUsers: async (user_id, receiver_id) => {
    const { data, error } = await supabase
      .from("meetuprequest")
      .select(
        `
      meetup_id,
      pet_id,
      donor_id,
      adopter_id,
      location,
      latitude,
      longitude,
      time,
      created_at,
      rejection_reason,
       is_accepted_by_donor,
            is_accepted_by_adopter,
      add_verification,
      adopter:adopter_id ( name ),
      donor:donor_id ( name ),
      pet ( name )
    `
      )
      .or(
        `and(donor_id.eq.${user_id},adopter_id.eq.${receiver_id}),and(donor_id.eq.${receiver_id},adopter_id.eq.${user_id})`
      )
      .order("created_at", { ascending: false }) // return most recent first
      .limit(1)
      .maybeSingle(); // safe: only one result max, or null if none

    if (error) throw new Error(error.message);
    if (!data) return null;

    return {
      meetup_id: data.meetup_id,
      pet_id: data.pet_id,
      donor_id: data.donor_id,
      adopter_id: data.adopter_id,
      location: data.location,
      latitude: data.latitude,
      longitude: data.longitude,
      time: data.time,
      created_at: data.created_at,
      is_accepted_by_donor: data.is_accepted_by_donor,
      is_accepted_by_adopter: data.is_accepted_by_adopter,
      rejection_reason: data.rejection_reason,
      add_verification: data.add_verification,
      adopter_name: data.adopter?.name || null,
      donor_name: data.donor?.name || null,
      pet_name: data.pet?.name || null,
    };
  },

  // include the new function in the module exports

  getMeetupsByPet: async (pet_id) => {
    const { data, error } = await supabase
      .from("meetuprequest")
      .select(
        `
              meetup_id,
              pet_id,
              donor_id,
              adopter_id,
              location,
              time,
              created_at,
              rejection_reason,
              add_verification,
               is_accepted_by_donor,
            is_accepted_by_adopter,
              adopter:adopter_id ( name ),
              donor:donor_id ( name ),
              pet ( name )
            `
      )
      .eq("pet_id", pet_id);

    if (error) throw new Error(error.message);

    return data.map((meetup) => ({
      meetup_id: meetup.meetup_id,
      pet_id: meetup.pet_id,
      donor_id: meetup.donor_id,
      adopter_id: meetup.adopter_id,
      location: meetup.location,
      time: meetup.time,
      rejection_reason: meetup.rejection_reason,
      add_verification: meetup.add_verification,
      is_accepted_by_donor: meetup.is_accepted_by_donor,
      is_accepted_by_adopter: meetup.is_accepted_by_adopter,
      created_at: meetup.created_at,
      adopter_name: meetup.adopter?.name || null,
      donor_name: meetup.donor?.name || null,
      pet_name: meetup.pet?.name || null,
    }));
  },

  updateMeetup: async (data) => {
    const { meetup_id, ...fieldsToUpdate } = data;

    // Filter out null or undefined values
    const filteredFields = Object.fromEntries(
      Object.entries(fieldsToUpdate).filter(
        ([_, v]) => v !== null && v !== undefined
      )
    );

    const { data: result, error } = await supabase
      .from("meetuprequest")
      .update(filteredFields)
      .eq("meetup_id", meetup_id)
      .select();

    if (error) throw new Error(error.message);
    return result;
  },

  deleteMeetup: async (meetup_id) => {
    const { data, error } = await supabase
      .from("meetuprequest")
      .delete()
      .eq("meetup_id", meetup_id);

    if (error) throw new Error(error.message);
    return data;
  },
};
