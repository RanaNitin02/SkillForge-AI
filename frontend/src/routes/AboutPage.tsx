import img1 from '../assets/img/logo/about-img1.jpg'
import img2 from '../assets/img/logo/about-img2.jpg'

function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

      <section className="relative bg-gradient-to-r from-indigo-600 to-blue-300 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg max-w-3xl mx-auto">
            At SkillForge AI, we’re redefining interview preparation with
            AI-powered simulations, real-time feedback, and personalized
            learning experiences.
          </p>
        </div>
      </section>


      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            We believe there’s a smarter, kinder way to grow skills. Our mission
            is to empower students and professionals by simulating real-world
            interviews, providing instant AI-driven feedback, and helping them
            build confidence step by step.
          </p>
          <p className="text-gray-600">
            By uniting cutting-edge AI, modern UI, and user-first design, we aim
            to create an ecosystem that makes career preparation effective and
            accessible for everyone.
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src={img2}
            alt="Our Mission"
            className="rounded-2xl shadow-lg max-h-60 w-full object-cover"
          />
        </div>
      </section>

      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <img
              src={img1}
              alt="Our Story"
              className="rounded-2xl shadow-lg w-full h-[250px] object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              SkillForge AI was born out of the need for smarter interview
              preparation tools. We noticed that while coding platforms exist,
              few simulate actual interviews with dynamic feedback.
            </p>
            <p className="text-gray-600">
              Our team set out to bridge this gap — combining AI, analytics, and
              user-friendly interfaces to create a platform that prepares you
              not just for the questions, but for the experience.
            </p>
          </div>
        </div>
      </section>



      <section className="max-w-6xl mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-100 rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600">
              We continuously explore the latest in AI and technology to provide
              smarter, more effective solutions.
            </p>
          </div>
          <div className="bg-gray-100 rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
            <p className="text-gray-600">
              We believe high-quality career preparation should be available to
              everyone, everywhere.
            </p>
          </div>
          <div className="bg-gray-100 rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Growth</h3>
            <p className="text-gray-600">
              We focus on helping learners build confidence and skills that grow
              with them throughout their careers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}


export default AboutPage;