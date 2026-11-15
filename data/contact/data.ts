export interface ContactInfo {
  organization: string;
  campus: string;
  address: string;
  city: string;
  country: string;
  primaryEmail: string;
  secondaryEmail: string;
  inquiryEmail: string;
  phone: string;
  officeHours: string;
  socials: {
    facebook: string;
    instagram: string;
    linkedin: string;
    github: string;
    youtube?: string;
  };
}

export const contactDetails: ContactInfo = {
  organization: "CSIT Association of BMC",
  campus: "Butwal Multiple Campus",
  address: "Golpark, Butwal, Rupandehi",
  city: "Butwal",
  country: "Nepal",
  primaryEmail: "info@csitabmc.com",
  secondaryEmail: "csitaofbmc@gmail.com",
  inquiryEmail: "team@csitabmc.com",
  phone: "+977 9867543210",
  officeHours: "Sunday – Friday: 10:00 AM – 4:00 PM (NPT)",
  socials: {
    facebook: "https://facebook.com/csitabmc",
    instagram: "https://instagram.com/csitabmc",
    linkedin: "https://linkedin.com/company/csitabmc",
    github: "https://github.com/CSIT-Association-of-BMC",
    youtube: "https://youtube.com/@csitabmc",
  },
};
