import img1 from '../assets/img/logo/about-img2.jpg'

function ServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-l from-blue-600 to-blue-300 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-lg max-w-3xl mx-auto">
            At SkillForge AI, we provide powerful AI-driven services designed to
            transform how you prepare for technical interviews and career growth.
          </p>
        </div>
      </section>

      {/* Service 1 */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <img
              src={img1}
              alt="AI-Powered Interviews"
              className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">AI-Powered Mock Interviews</h2>
            <p className="text-gray-600 mb-4">
              Simulate real-world interviews with dynamic AI-generated questions and
              personalized feedback powered by Google Gemini AI.
            </p>
            <p className="text-gray-600">
              Our service adapts to your role, domain, and difficulty level, giving you
              a realistic practice environment that builds confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Service 2 */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* text first on large screens */}
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-4">Custom Interview Flows</h2>
            <p className="text-gray-600 mb-4">
              Tailor your preparation with interviews based on the skills you want to
              focus on – frontend, backend, DSA, or system design.
            </p>
            <p className="text-gray-600">
              Our platform ensures that no two interviews are alike, providing fresh,
              adaptive experiences every time.
            </p>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <img
              src={img1}
              alt="Custom Flows"
              className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Service 3 */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <img
              src={img1 }
              alt="Analytics & Insights"
              className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Analytics & Insights</h2>
            <p className="text-gray-600 mb-4">
              Track your progress with detailed reports, performance analytics, and
              history logs that highlight your strengths and weaknesses.
            </p>
            <p className="text-gray-600">
              With actionable insights, you can refine your preparation strategy and
              achieve consistent improvement over time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicePage