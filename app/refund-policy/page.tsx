import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Refund Policy | Vedic Destiny",
  description:
    "Refund Policy for consultations, reports, remedies, and digital services offered by Vedic Destiny.",
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-bg-void selection:bg-gold-100 selection:text-copper-800">
      <Navbar />

      <div className="pt-24 lg:pt-32 flex-1 pb-16 max-w-[800px] mx-auto px-sp-5 w-full">
        <header className="mb-10 border-b border-gold-400/20 pb-6">
          <span className="eyebrow text-gold-500 tracking-[0.2em] uppercase text-xs">Legal &amp; Trust</span>
          <h1 className="font-display mt-sp-3 text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em] text-text-primary">
            Refund Policy
          </h1>
          <p className="mt-sp-2 text-sm text-text-muted font-sans font-medium">
            Effective Date: 29 July&rsquo;26
          </p>
        </header>

        <div className="font-sans text-text-secondary text-sm md:text-base space-y-6 leading-relaxed">
          <p>
            At Vedic Destiny.in, we are committed to providing professional Astrology, Numerology, Vastu, and related consultation services. Since our services involve the reservation of consultation time, personalized analysis, and preparation based on the information provided by the client, we maintain the following Refund Policy to ensure fairness and transparency.
          </p>
          <p>
            By booking an appointment or purchasing any service through Vedic Destiny.in, you acknowledge that you have read, understood, and agreed to this Refund Policy.
          </p>

          <hr className="border-gold-400/10" />

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              1. General Refund Policy
            </h2>
            <p>
              All payments made towards consultations, reports, remedies, courses, or any other services offered by Vedic Destiny.in are generally non-refundable, except in circumstances specifically mentioned in this policy.
            </p>
          </section>

          <hr className="border-gold-400/10" />

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              2. Appointment Booking
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Your appointment is confirmed only after successful receipt of the payment.</li>
              <li>The consultation time is exclusively reserved for you, and therefore, missed appointments cannot be allocated to another client.</li>
            </ul>
          </section>

          <hr className="border-gold-400/10" />

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              3. Missed Appointment / No-Show
            </h2>
            <p>
              If you fail to attend the consultation at the scheduled date and time without prior notice, the appointment will be treated as a No-Show. In such cases:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>No refund will be issued.</li>
              <li>The consultation fee will be forfeited.</li>
              <li>The appointment shall be considered completed for billing purposes.</li>
            </ul>
            <p>This includes situations where:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>You forget your appointment.</li>
              <li>You are unavailable.</li>
              <li>You fail to answer calls.</li>
              <li>Your internet connection or device is not functioning.</li>
              <li>You provide an incorrect contact number or email.</li>
              <li>You join after the consultation slot has substantially elapsed.</li>
            </ul>
          </section>

          <hr className="border-gold-400/10" />

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              4. Late Arrival
            </h2>
            <p>Clients are expected to join the consultation on time. If you arrive late:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>The consultation may be shortened to avoid affecting subsequent appointments.</li>
              <li>The consultation will end at the originally scheduled time.</li>
              <li>No additional time or refund will be provided.</li>
            </ul>
            <p>
              If the delay exceeds 15 minutes (or any duration specified by Vedic Destiny.in), it may be treated as a No-Show.
            </p>
          </section>

          <hr className="border-gold-400/10" />

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              5. Cancellation by the Client
            </h2>
            <p>Appointments cancelled:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>More than 24 hours before the scheduled consultation may be eligible for one complimentary rescheduling (subject to availability).</li>
              <li>Within 24 hours of the appointment are generally not eligible for any refund.</li>
              <li>Within 2 hours of the appointment or after the scheduled time are considered No-Shows.</li>
            </ul>
            <p>Refunds are generally not provided for client-initiated cancellations.</p>
          </section>

          <hr className="border-gold-400/10" />

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              6. Rescheduling Policy
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Clients may request rescheduling at least 24 hours before the scheduled appointment.</li>
              <li>
                Rescheduling is subject to:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Availability of appointment slots.</li>
                  <li>Approval by Vedic Destiny.in.</li>
                </ul>
              </li>
              <li>Repeated requests for rescheduling may be declined.</li>
              <li>Appointments cannot be rescheduled after the scheduled consultation time has passed.</li>
            </ul>
          </section>

          <hr className="border-gold-400/10" />

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              7. Failure to Provide Required Information
            </h2>
            <p>
              Certain services require accurate birth details, photographs, floor plans, property details, questionnaires, or other information. If the client:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>submits incorrect information,</li>
              <li>delays submission,</li>
              <li>fails to provide required details,</li>
            </ul>
            <p>
              resulting in delay or inability to provide the service, no refund shall be applicable. The accuracy of the consultation depends entirely upon the information provided by the client.
            </p>
          </section>

          <hr className="border-gold-400/10" />

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              8. Customized Reports and Personalized Services
            </h2>
            <p>Once work has commenced on:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Horoscope Analysis</li>
              <li>Kundli Reports</li>
              <li>Numerology Reports</li>
              <li>Vastu Reports</li>
              <li>Personalized Remedies</li>
              <li>Gemstone Recommendations</li>
              <li>Name Correction</li>
              <li>Signature Analysis</li>
              <li>Business Consultation</li>
              <li>Any customized report or document</li>
            </ul>
            <p>
              no refund shall be granted. Since these services involve significant professional time and personalized effort, they cannot be cancelled once preparation has begun.
            </p>
          </section>

          <hr className="border-gold-400/10" />

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              9. Digital Products
            </h2>
            <p>
              Payments made for downloadable reports, e-books, PDFs, courses, recordings, or any digital content are non-refundable once access has been granted or the content has been delivered.
            </p>
          </section>

          <hr className="border-gold-400/10" />

          {/* Section 10 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              10. Remedies and Spiritual Guidance
            </h2>
            <p>
              Astrology, Numerology, Vastu, and spiritual guidance are based on traditional knowledge, experience, interpretation, and professional judgment. Since results depend upon numerous personal, karmic, environmental, and practical factors beyond our control:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>No refund shall be issued based on dissatisfaction with predictions or guidance.</li>
              <li>No refund shall be issued because expected results were not achieved.</li>
              <li>No guarantee is made regarding specific outcomes.</li>
            </ul>
          </section>

          <hr className="border-gold-400/10" />

          {/* Section 11 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              11. Payment Failure
            </h2>
            <p>If a payment fails but the amount is debited from your bank account:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Please wait for the payment gateway or banking system to complete reconciliation.</li>
              <li>Most failed transactions are automatically reversed by the respective bank or payment gateway within the timelines prescribed by them.</li>
              <li>If the payment is received by Vedic Destiny.in after reconciliation, your booking will be confirmed accordingly.</li>
            </ul>
          </section>

          <hr className="border-gold-400/10" />

          {/* Section 12 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              12. Duplicate Payments
            </h2>
            <p>If you accidentally make multiple payments for the same appointment or service:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>The duplicate amount will be verified.</li>
              <li>After successful verification, the excess payment will be refunded to the original payment method.</li>
              <li>Processing may take 7&ndash;15 business days, depending on banking and payment gateway procedures.</li>
            </ul>
          </section>

          <hr className="border-gold-400/10" />

          {/* Section 13 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              13. Cancellation by Vedic Destiny.in
            </h2>
            <p>If Vedic Destiny.in is unable to conduct the consultation due to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>unforeseen circumstances,</li>
              <li>technical failure,</li>
              <li>medical emergency,</li>
              <li>unavoidable personal reasons,</li>
              <li>force majeure events,</li>
            </ul>
            <p>the client will be offered either:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>a rescheduled appointment, or</li>
              <li>a full refund, at the sole discretion of Vedic Destiny.in where rescheduling is not reasonably possible.</li>
            </ul>
          </section>

          <hr className="border-gold-400/10" />

          {/* Section 14 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              14. Technical Issues
            </h2>
            <p>
              If a consultation cannot be completed due to technical issues originating from Vedic Destiny.in, the remaining consultation may be rescheduled at no additional cost.
            </p>
            <p>
              Technical issues on the client&apos;s side&mdash;including internet outages, device malfunction, software issues, or power failure&mdash;do not qualify for a refund.
            </p>
          </section>

          <hr className="border-gold-400/10" />

          {/* Section 15 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              15. Refund Processing
            </h2>
            <p>Where a refund is approved:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Refunds will be processed only through the original payment method, wherever feasible.</li>
              <li>Processing may take 7&ndash;15 business days, depending on banks, card issuers, UPI providers, or payment gateways.</li>
              <li>Any payment gateway, banking, or transaction charges (where non-refundable) may be deducted, if permitted by applicable law.</li>
            </ul>
          </section>

          <hr className="border-gold-400/10" />

          {/* Section 16 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              16. Chargebacks and Payment Disputes
            </h2>
            <p>Initiating an unjustified chargeback or payment dispute after receiving the service may result in:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>suspension of future services,</li>
              <li>cancellation of appointments,</li>
              <li>recovery proceedings where legally permissible.</li>
            </ul>
            <p>Clients are encouraged to contact us first for any payment-related concerns.</p>
          </section>

          <hr className="border-gold-400/10" />

          {/* Section 17 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              17. Force Majeure
            </h2>
            <p>
              No refund or compensation shall be payable for delays or inability to provide services caused by circumstances beyond reasonable control, including but not limited to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>natural disasters,</li>
              <li>pandemics,</li>
              <li>government restrictions,</li>
              <li>war,</li>
              <li>strikes,</li>
              <li>power failures,</li>
              <li>internet outages,</li>
              <li>cyber incidents,</li>
              <li>payment gateway failures,</li>
              <li>or other force majeure events.</li>
            </ul>
            <p>Where feasible, appointments may instead be rescheduled.</p>
          </section>

          <hr className="border-gold-400/10" />

          {/* Section 18 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              18. Refund Request Procedure
            </h2>
            <p>To request a refund in eligible cases, please contact us with:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Full Name</li>
              <li>Registered Mobile Number</li>
              <li>Registered Email Address</li>
              <li>Transaction ID</li>
              <li>Payment Date</li>
              <li>Service Booked</li>
              <li>Reason for Refund Request</li>
            </ul>
            <p>
              All refund requests are reviewed individually, and the decision of Vedic Destiny.in shall be final, subject to applicable consumer protection laws.
            </p>
          </section>

          <hr className="border-gold-400/10" />

          {/* Section 19 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              19. Limitation of Liability
            </h2>
            <p>
              The maximum liability of Vedic Destiny.in in any circumstance shall not exceed the amount actually paid by the client for the specific service in question.
            </p>
            <p>
              Vedic Destiny.in shall not be liable for any indirect, incidental, consequential, special, or business losses arising from the use of its services.
            </p>
          </section>

          <hr className="border-gold-400/10" />

          {/* Section 20 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              20. Compliance with Applicable Laws
            </h2>
            <p>
              This Refund Policy shall be governed by and interpreted in accordance with the laws of India. Nothing in this policy limits or excludes any statutory rights available to consumers under applicable law, including the Consumer Protection Act, 2019, where such rights cannot be lawfully excluded.
            </p>
          </section>

          <hr className="border-gold-400/10" />

          {/* Contact */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              Contact Us
            </h2>
            <p>
              For any questions regarding this Refund Policy or refund eligibility, please contact:
            </p>
            <div className="bg-bg-cosmos border border-gold-400/10 p-5 rounded-card space-y-2 text-sm font-medium">
              <div>
                <span className="block text-[10px] text-text-muted uppercase tracking-wider font-bold">Vedic Destiny.in</span>
              </div>
              <div>
                <span className="block text-[10px] text-text-muted uppercase tracking-wider font-bold">Email</span>
                <a href="mailto:soumitrarc101010@gmail.com" className="text-text-primary hover:text-gold-500 transition-colors">
                  soumitrarc101010@gmail.com
                </a>
              </div>
              <div>
                <span className="block text-[10px] text-text-muted uppercase tracking-wider font-bold">Phone</span>
                <a href="tel:+917800333373" className="text-text-primary hover:text-gold-500 transition-colors">
                  +91 78003 33373
                </a>
              </div>
              <div>
                <span className="block text-[10px] text-text-muted uppercase tracking-wider font-bold">Website</span>
                <a href="https://vedicdestiny.in" className="text-text-primary hover:text-gold-500 transition-colors">
                  VedicDestiny.in
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
