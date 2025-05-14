import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About E-Tutor</h1>
          <p className="text-xl">Empowering Students Through Personalized Learning</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Our Story */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2023, E-Tutor emerged from a simple idea: every student deserves 
                access to quality education tailored to their unique needs. What started as 
                a small team of passionate educators has grown into a thriving platform 
                connecting thousands of students with expert tutors worldwide.
              </p>
              <p className="text-gray-600">
                We've helped over 50,000 students achieve their academic goals through 
                personalized 1-on-1 tutoring sessions, creating a revolution in online 
                education.
              </p>
            </div>
            <img 
              src="https://picsum.photos/600/400" 
              alt="Our Team" 
              className="rounded-xl shadow-lg"
            />
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Our Mission</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto">
            To democratize quality education by connecting students with exceptional tutors, 
            fostering meaningful learning experiences that transcend geographical boundaries 
            and traditional classroom limitations.
          </p>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                <img 
                  src={`https://picsum.photos/200/200?random=${item}`} 
                  alt="Team member" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-2">John Doe</h3>
                <p className="text-blue-600 mb-2">Co-Founder & CEO</p>
                <p className="text-gray-600 text-sm">
                  Education enthusiast with 10+ years experience in curriculum development
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Personalized Learning</h3>
              <p className="text-gray-600">
                We believe every student is unique and deserves a learning plan tailored 
                to their specific needs and goals.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quality First</h3>
              <p className="text-gray-600">
                Rigorous tutor selection process ensures only top 5% of applicants join 
                our platform.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Continuous Innovation</h3>
              <p className="text-gray-600">
                Constantly improving our platform with cutting-edge tools to enhance 
                the learning experience.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <div className="bg-blue-800 text-white py-12 rounded-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-6xl mx-auto">
            <div>
              <div className="text-3xl font-bold mb-2">50K+</div>
              <div className="text-sm">Students Helped</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-sm">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">862</div>
              <div className="text-sm">Expert Tutors</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-sm">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-yellow-500 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Ready to Start Learning?</h2>
          <p className="text-gray-800 mb-8 text-lg">
            Join thousands of successful students who've transformed their education with E-Tutor
          </p>
          <button className="bg-blue-800 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition">
            Find Your Tutor Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;