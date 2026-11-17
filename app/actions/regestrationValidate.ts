"use server";

import { getEvents } from "@/lib/api/events";

export const getEvent = async () => {
  try {
    const { events } = await getEvents();
    return events[0] || null;
  } catch (error) {
    console.error("Error fetching event data:", error);
    return null;
  }
};

export const getAllRegistration = async () => {
  try {
    const apiUrl =
      process.env.REGISTRATION_DATA_API || process.env.REGESTATION_DATA_API;
    if (!apiUrl) return [];
    const response = await fetch(apiUrl);
    const res = await response.json();
    return res.data || [];
  } catch (error) {
    console.error("Error fetching registration data:", error);
    return [];
  }
};

export const validateRegistration = async (name: string, email: string) => {
  try {
    const Data = await getAllRegistration();
    const user = Data.find(
      (item: any) =>
        item.Email?.toUpperCase().trim() === email.toUpperCase().trim()
    );

    if (!user) {
      return {
        exists: false,
        nameMatch: false,
        paid: false,
        name: { status: false },
        payment: { status: false },
      };
    }

    return {
      exists: true,
      nameMatch: user.FullName?.toLowerCase().trim() === name.toLowerCase().trim(),
      paid: Boolean(user.Paid),
      name: { status: user.FullName?.toLowerCase().trim() === name.toLowerCase().trim() },
      payment: { status: Boolean(user.Paid) },
    };
  } catch (error) {
    console.error("Error validating registration:", error);
    return {
      exists: false,
      nameMatch: false,
      paid: false,
      name: { status: false },
      payment: { status: false },
    };
  }
};
