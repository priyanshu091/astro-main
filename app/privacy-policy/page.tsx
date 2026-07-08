import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-bg-void selection:bg-gold-100 selection:text-copper-800">
      <Navbar />
      
      <div className="pt-24 lg:pt-32 flex-1 pb-16 max-w-[800px] mx-auto px-sp-5 w-full">
        <header className="mb-10 border-b border-gold-400/20 pb-6">
          <span className="eyebrow text-gold-500 tracking-[0.2em] uppercase text-xs">Legal &amp; Trust</span>
          <h1 className="font-display mt-sp-3 text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em] text-text-primary">
            Privacy Policy
          </h1>
          <p className="mt-sp-2 text-sm text-text-muted font-sans font-medium">
            Effective Date Of Privacy Policy: 26 March’26
          </p>
        </header>

        <div className="font-sans text-text-secondary text-sm md:text-base space-y-6 leading-relaxed">
          <p>
            Vedic Destiny (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to safeguarding the privacy and confidentiality of all individuals (&ldquo;users&rdquo;, &ldquo;members&rdquo;, or &ldquo;clients&rdquo;) who access our website and services. This Privacy Policy outlines how we collect, use, store, and protect your personal information.
          </p>
          <p>
            By using our website, you consent to the practices described in this Privacy Policy.
          </p>

          <hr className="border-gold-400/10" />

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              Confidentiality Commitment-Privacy Policy
            </h2>
            <p>
              We maintain strict confidentiality of all personal and sensitive information provided by our users, including but not limited to identity details, birth information, and astrological data.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>All information shared with us is used solely for the purpose of delivering our services.</li>
              <li>We do not disclose, publish, or share any personal data with third parties without explicit consent, except where required by law.</li>
              <li>Predictions, reports, and consultations are strictly confidential and shared only with the concerned individual.</li>
            </ul>
          </section>

          <hr className="border-gold-400/10" />

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="font-display text-xl font-bold text-text-primary">
              Information We Collect
            </h2>
            
            <div className="space-y-2">
              <h3 className="font-sans font-bold text-text-primary text-sm uppercase tracking-wide">
                Personal Information
              </h3>
              <p>
                We may collect the following details during registration or service requests:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Full Name</li>
                <li>Gender</li>
                <li>Date, Time, and Place of Birth</li>
                <li>Email Address</li>
                <li>Contact Number</li>
                <li>Residential Address (if required for service delivery)</li>
              </ul>
              <p>
                This information is essential for preparing accurate astrological readings and providing personalized services.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="font-sans font-bold text-text-primary text-sm uppercase tracking-wide">
                Technical &amp; Usage Data
              </h3>
              <p>
                When you visit our website, we may automatically collect:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>IP address</li>
                <li>Browser type and device information</li>
                <li>Pages visited and time spent</li>
                <li>Cookies and tracking data</li>
              </ul>
              <p>
                This data is used strictly for analytical purposes to improve website performance and user experience.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="font-sans font-bold text-text-primary text-sm uppercase tracking-wide">
                Service-Related Information
              </h3>
              <p>
                For paid or customized services, additional information may be collected via:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Email</li>
                <li>Secure messaging platforms (e.g., official WhatsApp channels)</li>
              </ul>
              <p className="text-text-muted italic">
                We discourage sharing sensitive information through unauthorized or third-party channels.
              </p>
            </div>
          </section>

          <hr className="border-gold-400/10" />

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              Use of Information
            </h2>
            <p>
              We use collected information for the following purposes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>To deliver astrology, numerology, and vastu services</li>
              <li>To communicate reports, updates, and service-related information</li>
              <li>To improve website functionality and user experience</li>
              <li>To respond to inquiries and customer support requests</li>
            </ul>
            <p>
              We do not sell, rent, or trade your personal data for marketing or promotional purposes.
            </p>
          </section>

          <hr className="border-gold-400/10" />

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              Cookies and Tracking Technologies
            </h2>
            <p>
              Our website may use cookies to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Enhance user experience</li>
              <li>Analyze website traffic and usage patterns</li>
            </ul>
            <p>
              Users may choose to disable cookies through browser settings; however, some features of the website may not function properly.
            </p>
          </section>

          <hr className="border-gold-400/10" />

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              Data Security
            </h2>
            <p>
              We implement reasonable administrative, technical, and physical safeguards to protect your information from unauthorized access, misuse, or disclosure.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Payments are processed only through secure and authorized payment gateways</li>
              <li>We do not accept direct or unverified payment methods</li>
              <li>While we strive for complete security, no system can guarantee absolute protection against all risks</li>
            </ul>
          </section>

          <hr className="border-gold-400/10" />

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              User Rights
            </h2>
            <p>
              As a user, you have the right to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access your personal data</li>
              <li>Request correction or updates</li>
              <li>Request deletion of your data (subject to legal obligations)</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p>
              You may also update your profile, change passwords, or modify your information through your account settings.
            </p>
          </section>

          <hr className="border-gold-400/10" />

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              Third-Party Links
            </h2>
            <p>
              Our website may contain links to external websites for informational purposes. We are not responsible for the privacy practices or content of such third-party websites.
            </p>
          </section>

          <hr className="border-gold-400/10" />

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              Data Sharing
            </h2>
            <p>
              We may share limited information with trusted third-party service providers (such as hosting or analytics partners) strictly for operational purposes, under confidentiality obligations. We do not share personal data for advertising or resale.
            </p>
          </section>

          <hr className="border-gold-400/10" />

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              Policy Updates
            </h2>
            <p>
              We may update this Privacy Policy periodically to reflect changes in legal, technical, or business requirements. Updates will be posted on this page. Continued use of the website constitutes acceptance of the revised policy.
            </p>
          </section>

          <hr className="border-gold-400/10" />

          {/* Section 10 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              Contact Information
            </h2>
            <p>
              For any questions, concerns, or complaints regarding this Privacy Policy or your data, please contact us:
            </p>
            <div className="bg-bg-cosmos border border-gold-400/10 p-5 rounded-card space-y-2 text-sm font-medium">
              <div>
                <span className="block text-[10px] text-text-muted uppercase tracking-wider font-bold">Email</span>
                <a href="mailto:soumitrarc101010@gmail.com" className="text-text-primary hover:text-gold-500 transition-colors">
                  soumitrarc101010@gmail.com
                </a>
              </div>
              <div>
                <span className="block text-[10px] text-text-muted uppercase tracking-wider font-bold">Website</span>
                <a href="https://vedicdestiny.in" className="text-text-primary hover:text-gold-500 transition-colors">
                  VedicDestiny.in
                </a>
              </div>
            </div>

            <div className="pt-2">
              <span className="block text-[10px] text-text-muted uppercase tracking-wider font-bold mb-2">Connect with us on other platforms:</span>
              <div className="flex flex-col gap-y-2 text-xs font-semibold text-gold-600 uppercase">
                <a href="https://in.pinterest.com/soumitrarc101010/" target="_blank" rel="noopener noreferrer" className="hover:text-gold-800 transition-colors">
                  Pinterest: SRC19 soumitrarc101010
                </a>
                <a href="https://www.quora.com/profile/Soumitra-Roy-Chowdhury-1" target="_blank" rel="noopener noreferrer" className="hover:text-gold-800 transition-colors">
                  Quora: Acharya Soumitra Roy Chowdhury
                </a>
                <a href="https://www.reddit.com/user/According-Vast1873" target="_blank" rel="noopener noreferrer" className="hover:text-gold-800 transition-colors">
                  Reddit: Vedic Destiny u/According-Vast1873
                </a>
                <a href="https://medium.com/@soumitrarc101010" target="_blank" rel="noopener noreferrer" className="hover:text-gold-800 transition-colors">
                  Medium: Soumitrarc
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
