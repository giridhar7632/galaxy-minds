import Layout from '@/components/layout'

const about = () => {
  return (
    <Layout meta={{ name: 'About' }}>
      <section className="prose my-10 mx-auto xl:prose-lg">
        <h1>About Galaxy Minds</h1>

        <p>
          Welcome to Galaxy Minds, your gateway to collaborative learning and academic excellence.
          We are passionate about fostering a vibrant and supportive community of learners.
        </p>

        <h2>Our Mission</h2>
        <p>
          At Galaxy Minds, our mission is to empower students to reach their full potential by
          providing a platform for knowledge-sharing and collaboration. We believe that every
          learner is a star, and together, we can illuminate the path to success.
        </p>

        <h2>Our Team</h2>
        <p>
          Galaxy Minds is driven by a dedicated team of educators, developers, and lifelong
          learners. We are committed to creating a space where students can connect, share insights,
          and inspire each other on their educational journeys.
        </p>

        <h2>Join Us</h2>
        <p>
          We invite you to join our community of star-like students and embark on a journey of
          exploration and discovery. Together, we can create constellations of knowledge and make
          learning an exciting and collaborative adventure.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions, feedback, or ideas to share, please don't hesitate to reach out
          to us at <a href="mailto:talla_11915139@nitkkr.ac.in">contact@galaxy-minds.com</a>. We value your input and are here to support your educational
          endeavors.
        </p>
      </section>
    </Layout>
  )
}

export default about
