import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | CSIT Association of BMC Notice App",
  description:
    "Privacy Policy explaining how CSIT Association of BMC's Notice App collects, uses, stores, and protects user and device information.",
};

const APP_NAME = "CSIT Association of BMC App";

// Replace these before publishing.
const DEVELOPER_NAME = "Sanchit Pandey";
const CONTACT_EMAIL = "mail@sanchit.pro";

const LAST_UPDATED = "August 25, 2026";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-slate-700">
      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-6 sm:py-16 lg:py-20">
        {/* Header */}
        <header className="border-b border-slate-200 pb-10">
          <p className="mb-4 text-sm font-medium text-slate-500">
            Legal
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            This Privacy Policy explains how {APP_NAME} handles information
            when you use our mobile application and related services.
          </p>

          <p className="mt-5 text-sm text-slate-500">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        {/* Content */}
        <div className="space-y-12 py-10">
          <PolicySection title={`1. About ${APP_NAME}`}>
            <p>
              {APP_NAME} is an informational notice application operated by{" "}
              <strong><a href="https://csitabmc.com">CSIT Association of BMC</a></strong>. It allows users to view
              published notices, notice categories, descriptions, dates,
              images, and receive notifications when new information is
              published.
            </p>

            <p>
              The application is intended for users aged{" "}
              <strong>16 years and older</strong>.
            </p>

            <p>
              We aim to collect and process only the minimum amount of
              information necessary to operate the application.
            </p>
          </PolicySection>

          <PolicySection title="2. Information We Collect">
            <p>
              {APP_NAME} does not require users to create an account and does
              not request personal information such as your name, home address,
              phone number, password, or payment information.
            </p>

            <SubHeading>Push notification token</SubHeading>

            <p>
              If you grant notification permission, the application may
              generate a push notification token associated with the
              installation of the application on your device.
            </p>

            <p>
              This token may be sent to our backend server and stored so that
              notifications can be delivered when new notices or important
              application updates are published.
            </p>

            <p>
              A push notification token is a technical identifier used for
              notification delivery. We do not use it to create advertising
              profiles or intentionally identify you as an individual.
            </p>

            <SubHeading>Notification preferences</SubHeading>

            <p>
              We may store technical information indicating whether
              notifications for an application installation are enabled,
              disabled, active, or no longer valid.
            </p>

            <SubHeading>Technical and server information</SubHeading>

            <p>
              When the application communicates with our servers, basic
              technical information may automatically be processed by our
              server or hosting provider.
            </p>

            <BulletList
              items={[
                "IP address",
                "Request timestamps",
                "Requested API endpoints",
                "Basic network request information",
                "Server error logs",
                "Device or application information made available through normal network requests",
              ]}
            />

            <p>
              This information may be used for security, troubleshooting,
              abuse prevention, system reliability, and maintenance.
            </p>
          </PolicySection>

          <PolicySection title="3. Information We Do Not Intentionally Collect">
            <p>
              The application is not designed to collect or request the
              following information:
            </p>

            <BulletList
              items={[
                "Contacts",
                "Precise or approximate location",
                "Camera recordings",
                "Microphone recordings",
                "Personal photos or media",
                "SMS messages",
                "Call logs",
                "Financial or payment information",
                "Health information",
                "Passwords",
                "Biometric information",
                "Government identification documents",
              ]}
            />

            <p>
              We do not use the application to perform behavioral advertising,
              cross-app tracking, or commercial user profiling.
            </p>
          </PolicySection>

          <PolicySection title="4. How We Use Information">
            <p>
              Information processed through {APP_NAME} is used only for
              purposes reasonably necessary to operate and maintain the
              application.
            </p>

            <BulletList
              items={[
                "Deliver push notifications about newly published notices",
                "Manage notification subscriptions and delivery",
                "Display notices and related application content",
                "Maintain application and server security",
                "Identify and resolve technical problems",
                "Prevent misuse or abuse of the service",
                "Maintain the reliability of our infrastructure",
              ]}
            />

            <p>
              We do not sell user information or push notification tokens.
            </p>
          </PolicySection>

          <PolicySection title="5. Push Notifications">
            <p>
              The application may request permission to send push
              notifications.
            </p>

            <p>
              Notifications are optional. You may deny notification permission
              when prompted or disable notifications later through your
              device&apos;s operating system settings.
            </p>

            <p>
              If permission is granted, your device may receive notifications
              related to new notices, important announcements, or relevant
              application updates.
            </p>
          </PolicySection>

          <PolicySection title="6. Third-Party Services">
            <p>
              We may rely on third-party infrastructure providers to operate
              certain application functionality.
            </p>

            <SubHeading>Expo</SubHeading>

            <p>
              The application may use Expo&apos;s notification infrastructure
              to generate and process push notification tokens and deliver
              notifications.
            </p>

            <SubHeading>Firebase Cloud Messaging</SubHeading>

            <p>
              On supported Android devices, notifications may be delivered
              using Google Firebase Cloud Messaging (FCM). Google may process
              technical information necessary to route and deliver
              notifications.
            </p>

            <SubHeading>Apple Push Notification Service</SubHeading>

            <p>
              If the application is available on iOS, push notifications may
              be delivered using Apple Push Notification Service (APNs). Apple
              may process technical information necessary for notification
              delivery.
            </p>

            <SubHeading>Hosting and backend infrastructure</SubHeading>

            <p>
              Our backend, content management system, APIs, database, or web
              hosting may be provided through third-party infrastructure
              providers. These services may process technical server data as
              necessary to provide hosting, security, networking, or database
              functionality.
            </p>

            <p>
              Third-party providers process information according to their own
              privacy policies and terms.
            </p>
          </PolicySection>

          <PolicySection title="7. Notices, Images, and Application Content">
            <p>
              Notices displayed in {APP_NAME}, including their titles,
              descriptions, categories, publication dates, and related images,
              are retrieved from our backend content management system.
            </p>

            <p>
              Users may browse published notice content without creating an
              account or providing personal information.
            </p>
          </PolicySection>

          <PolicySection title="8. Advertising and Tracking">
            <p>
              {APP_NAME} does not currently display third-party advertising.
            </p>

            <p>
              We do not use push notification tokens or other application
              information for targeted advertising, behavioral advertising, or
              advertising profiling.
            </p>

            <p>We do not sell user or device information to advertisers.</p>
          </PolicySection>

          <PolicySection title="9. Data Sharing">
            <p>
              We do not sell or rent information collected through the
              application.
            </p>

            <p>
              Limited technical information may be processed or shared when
              necessary with service providers that help us operate the
              application, including:
            </p>

            <BulletList
              items={[
                "Push notification delivery providers",
                "Application hosting providers",
                "Backend and database infrastructure providers",
                "Security and networking providers",
              ]}
            />

            <p>
              We may also disclose information when required by applicable law,
              regulation, legal process, or a valid request from a competent
              authority.
            </p>
          </PolicySection>

          <PolicySection title="10. Data Security">
            <p>
              We take reasonable technical and organizational measures to
              protect information processed through {APP_NAME}.
            </p>

            <p>These measures may include:</p>

            <BulletList
              items={[
                "Using HTTPS for communication between the application and backend services",
                "Restricting administrative access to backend systems",
                "Limiting stored information to what is necessary for application functionality",
                "Using appropriate server and infrastructure security practices",
                "Monitoring technical failures and suspicious activity where appropriate",
              ]}
            />

            <p>
              However, no method of electronic transmission, networking, or
              data storage can be guaranteed to be completely secure.
            </p>
          </PolicySection>

          <PolicySection title="11. Data Retention">
            <p>
              Push notification tokens may be retained while they remain
              necessary to provide notification functionality.
            </p>

            <p>
              Tokens that become invalid, inactive, disabled, or otherwise no
              longer necessary may be deactivated or deleted.
            </p>

            <p>
              Technical logs may be retained for a limited period where
              reasonably necessary for security, troubleshooting, maintenance,
              legal compliance, or prevention of abuse.
            </p>

            <p>
              We aim not to retain information longer than reasonably required
              for the purposes described in this Privacy Policy.
            </p>
          </PolicySection>

          <PolicySection title="12. Data Deletion">
            <p>
              Because {APP_NAME} does not require account registration, there
              is generally no user account or personal profile stored by the
              application that needs to be deleted.
            </p>

            <p>
              You may stop push notifications at any time by disabling
              notification permission through your device settings.
            </p>

            <p>
              If you believe information related to your application
              installation is stored by us and you would like to request its
              deletion, contact us at{" "}
              <EmailLink email={CONTACT_EMAIL} />.
            </p>

            <p>
              We may request reasonable information necessary to identify the
              relevant application installation or technical record before
              completing a deletion request.
            </p>
          </PolicySection>

          <PolicySection title="13. Users Aged 16 and 17">
            <p>
              {APP_NAME} is intended for users aged{" "}
              <strong>16 years and older</strong>.
            </p>

            <p>
              We recognize that users aged 16 or 17 may be considered children
              or minors under the laws of certain countries or regions.
            </p>

            <p>
              The application does not require users to provide their name,
              address, phone number, date of birth, payment information, or
              other account information in order to access published notices.
            </p>

            <p>
              Where applicable law provides additional protections for users
              aged 16 or 17, we intend to handle information in accordance with
              those requirements.
            </p>

            <p>
              A parent, guardian, or user who believes information relating to
              a minor has been handled improperly may contact us at{" "}
              <EmailLink email={CONTACT_EMAIL} />.
            </p>
          </PolicySection>

          <PolicySection title="14. Children's Privacy">
            <p>
              The application is not intended for users under the age of 16.
            </p>

            <p>
              We do not knowingly request personal information from children
              under 16 through account registration, profiles, messaging, or
              similar features.
            </p>

            <p>
              If we become aware that personal information from a child under
              the applicable minimum age has been collected improperly, we
              will take reasonable steps to delete or otherwise appropriately
              handle that information.
            </p>

            <p>
              Parents or guardians may contact us at{" "}
              <EmailLink email={CONTACT_EMAIL} /> regarding privacy concerns.
            </p>
          </PolicySection>

          <PolicySection title="15. Your Choices">
            <p>
              You have control over certain application functionality.
            </p>

            <BulletList
              items={[
                "You may decline notification permission",
                "You may disable notifications at any time from your device settings",
                "You may uninstall the application at any time",
                "You may contact us to request information about our privacy practices",
                "You may request deletion of information associated with your application installation where applicable",
              ]}
            />
          </PolicySection>

          <PolicySection title="16. International Users">
            <p>
              The application may be accessible from different countries.
              Privacy, data protection, and child protection requirements may
              vary depending on where you are located.
            </p>

            <p>
              Where applicable, we will process information in accordance with
              relevant legal requirements.
            </p>
          </PolicySection>

          <PolicySection title="17. Changes to This Privacy Policy">
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes to the application, our technical infrastructure, legal
              requirements, or our data practices.
            </p>

            <p>
              When we make changes, the updated policy will be published on
              this page and the &quot;Last updated&quot; date will be revised.
            </p>

            <p>
              We encourage users to review this Privacy Policy periodically.
            </p>
          </PolicySection>

          <PolicySection title="18. Contact Us">
            <p>
              If you have questions, concerns, privacy requests, or data
              deletion requests relating to {APP_NAME}, you may contact:
            </p>

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <div className="space-y-1 text-sm sm:text-base">
                <p className="font-semibold text-slate-950">
                  {DEVELOPER_NAME}
                </p>

                <p>{APP_NAME}</p>

                <p>
                  Email: <EmailLink email={CONTACT_EMAIL} />
                </p>
              </div>
            </div>
          </PolicySection>
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-200 pt-8">
          <p className="text-sm leading-6 text-slate-500">
            © {new Date().getFullYear()} {DEVELOPER_NAME}. All rights
            reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Components                                                                  */
/* -------------------------------------------------------------------------- */

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
        {title}
      </h2>

      <div className="mt-5 space-y-4 text-[15px] leading-7 text-slate-600 sm:text-base">
        {children}
      </div>
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="pt-3 text-base font-semibold text-slate-900 sm:text-lg">
      {children}
    </h3>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 pl-5">
      {items.map((item) => (
        <li
          key={item}
          className="list-disc pl-1 marker:text-slate-400"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function EmailLink({ email }: { email: string }) {
  return (
    <a
      href={`mailto:${email}`}
      className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 transition hover:decoration-slate-700"
    >
      {email}
    </a>
  );
}
