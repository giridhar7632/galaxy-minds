import Layout from '@/components/layout'

const terms = () => {
  return (
    <Layout meta={{ name: 'Terms' }}>
      <section id={'terms'} className="prose xl:prose-lg mx-auto my-10">
        <h1>Terms and Conditions for Galaxy Minds</h1>

        <p>Last updated: 3 Sept, 2023</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using the Galaxy Minds platform ("the Service"), you agree to comply with
          and be bound by these Terms and Conditions. If you do not agree with these terms, please
          refrain from using the Service.
        </p>

        <h2>2. User Registration</h2>
        <p>2.1. You must register an account to use certain features of the Service.</p>
        <p>
          2.2. You are responsible for maintaining the confidentiality of your account credentials.
        </p>

        <h2>3. User Conduct</h2>
        <p>
          3.1. You agree to use the Service for lawful purposes and in compliance with all
          applicable laws and regulations.
        </p>
        <p>
          3.2. You may not:
          <ul>
            <li>Impersonate any person or entity.</li>
            <li>
              Transmit any content that is offensive, harmful, or violates the rights of others.
            </li>
            <li>Use the Service for spamming, phishing, or any fraudulent activity.</li>
            <li>Attempt to gain unauthorized access to the Service or its systems.</li>
          </ul>
        </p>

        <h2>4. Study Groups</h2>
        <p>4.1. Users can create and join study groups.</p>
        <p>
          4.2. Users are responsible for their conduct within study groups and must adhere to any
          rules established by group administrators.
        </p>
        <p>4.3. Galaxy Minds is not responsible for the content shared within study groups.</p>

        <h2>5. Intellectual Property</h2>
        <p>
          5.1. All content, including but not limited to text, graphics, logos, and software, is
          protected by intellectual property laws and remains the property of Galaxy Minds or its
          licensors.
        </p>
        <p>
          5.2. You may not reproduce, distribute, or use any content from the Service without
          permission.
        </p>

        <h2>6. Privacy</h2>
        <p>
          6.1. Your use of the Service is subject to our <a href="/policy">Privacy Policy</a>.
        </p>

        <h2>7. Termination</h2>
        <p>
          7.1. Galaxy Minds reserves the right to terminate or suspend your account or access to the
          Service for any reason, including violation of these Terms and Conditions.
        </p>

        <h2>8. Disclaimer</h2>
        <p>
          8.1. The Service is provided "as is," without warranties of any kind, either express or
          implied.
        </p>
        <p>
          8.2. Galaxy Minds does not guarantee the accuracy, completeness, or reliability of any
          content on the Service.
        </p>

        <h2>9. Limitation of Liability</h2>
        <p>
          9.1. Galaxy Minds shall not be liable for any direct, indirect, incidental, special, or
          consequential damages resulting from the use or inability to use the Service.
        </p>

        <h2>10. Changes to Terms</h2>
        <p>
          10.1. Galaxy Minds may update these Terms and Conditions at any time. The latest version
          will be posted on this page with the "Last updated" date.
        </p>

        <h2>11. Governing Law</h2>
        <p>
          11.1. These Terms and Conditions are governed by and construed in accordance with the laws
          of India.
        </p>
      </section>
    </Layout>
  )
}

export default terms
