import React from "react";
import { format } from "date-fns";
import {
  Page,
  Text,
  View,
  Document,
  Image,
  Svg,
  Path,
} from "@react-pdf/renderer";
import { styles } from "./style";
import { CertificateTypes } from "@/types/certificate";

const Certificate = ({ data }: { data: CertificateTypes }) => {
  const certificateDetails = {
    id: data.certificateID,
    recipientName: data.fullName,
    courseName: data.event.title,
    completionDate: format(new Date(data.event.endDate), "MMMM d, yyyy"),
    signatures: [
      {
        name: "Mr. Sanchit Pandey",
        title: "President",
        institute: "CSIT Association of BMC",
        image: "/sanchit-sign.png",
      },
      {
        name: "Dr. Arun Kumar Kshetree",
        title: "Campus Chief",
        institute: "Butwal Multiple Campus",
        image: "/arun-sign.png",
      },
      {
        name: "Mr. Gobinda Adhikari",
        title: "B.Sc. CSIT Program Director",
        institute: "Butwal Multiple Campus",
        image: "/gobinda-sign.png",
      },
    ],
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=https://csitabmc.com/certificate/${certificateDetails.id}&size=200x200`;

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Decorative Elements */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
        <View style={styles.diagonalLine1} />
        <View style={styles.diagonalLine2} />
        <View style={styles.diagonalLine3} />
        <View style={styles.topBorderLine} />
        <View style={styles.topGradientLine} />
        <View style={styles.bottomGradientLine} />
        <View style={styles.cornerBorderTopLeft} />
        <View style={styles.cornerBorderBottomRight} />

        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoSection}>
              <View style={styles.logo}>
                <Image src="/logo.png" style={styles.logoImage} />
              </View>
              <View style={styles.companyInfo}>
                <Text style={styles.companyName}>CSIT Association Of BMC</Text>
                <Text style={styles.companyTagline}>
                  Creating the world bit by bit
                </Text>
              </View>
            </View>
            <View style={styles.certIdSection}>
              <Text style={styles.certIdLabel}>Certificate ID</Text>
              <Text style={styles.certId}>{certificateDetails.id}</Text>
            </View>
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            <View style={styles.contentSection}>
              <Text style={styles.certifyText}>This is to Certify That</Text>

              <Text style={styles.recipientName}>
                {certificateDetails.recipientName}
              </Text>
              <View style={styles.nameUnderline} />

              <Text style={styles.completionText}>
                has successfully completed this certified course demonstrating
                dedication and achivement in
              </Text>

              <Text style={styles.courseName}>
                {certificateDetails.courseName}
              </Text>

              <Text style={styles.awardedDate}>
                Awarded on {certificateDetails.completionDate}
              </Text>

              {/* Signatures */}
              <View style={styles.signaturesSection}>
                {certificateDetails.signatures.map((signature, index) => (
                  <View key={signature.name} style={styles.signatureItem}>
                    {signature.image ? (
                      <View style={styles.signatureImageContainer}>
                        <Image
                          src={signature.image}
                          style={styles.signatureImage}
                        />
                      </View>
                    ) : (
                      <Svg viewBox="0 0 180 8" style={styles.signatureLine}>
                        <Path
                          d={
                            index % 2 === 0
                              ? "M 10 6 Q 25 3, 45 5.6 Q 65 8, 85 5 Q 105 2, 125 6 Q 145 9, 165 5.6"
                              : "M 10 5 Q 30 7, 50 4 Q 70 1, 90 5 Q 110 8, 130 4 Q 150 2, 170 6"
                          }
                          stroke="#374151"
                          strokeWidth="1.5"
                          fill="none"
                        />
                      </Svg>
                    )}
                    <View style={styles.signatureDivider} />
                    <Text style={styles.signatureName}>{signature.name}</Text>
                    <Text style={styles.signatureTitle}>{signature.title}</Text>
                    <Text style={styles.signatureInstitute}>
                      {signature.institute}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* QR Code */}
            <View style={styles.qrSection}>
              <View style={styles.qrContainer}>
                <Image src={qrCodeUrl} style={styles.qrImage} />
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Certificate;
