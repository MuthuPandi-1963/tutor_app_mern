import { useState } from 'react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa6';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#0a192f] text-gray-300 py-20 px-4 md:px-8 lg:px-16 xl:px-32">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-3xl font-bold inline border-b-4 border-[#64ffda]">Contact</p>
          <p className="mt-4 text-lg">Submit the form below or reach out directly at <span className="text-[#64ffda]">muthupandir74738@gmail.com</span></p>
        </div>

        {/* Contact Container */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label className="text-sm text-[#64ffda]">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-2 bg-[#0a192f] border-2 border-[#233554] rounded focus:outline-none focus:border-[#64ffda]"
                required
              />
            </div>

            <div>
              <label className="text-sm text-[#64ffda]">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-2 bg-[#0a192f] border-2 border-[#233554] rounded focus:outline-none focus:border-[#64ffda]"
                required
              />
            </div>

            <div>
              <label className="text-sm text-[#64ffda]">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full p-2 bg-[#0a192f] border-2 border-[#233554] rounded focus:outline-none focus:border-[#64ffda]"
                required
              />
            </div>

            <div>
              <label className="text-sm text-[#64ffda]">Message</label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full p-2 bg-[#0a192f] border-2 border-[#233554] rounded focus:outline-none focus:border-[#64ffda]"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 border-2 border-[#64ffda] text-[#64ffda] rounded hover:bg-[#64ffda1a] transition-all duration-300"
            >
              Send Message
            </button>

            {isSubmitted && (
              <p className="text-[#64ffda] text-center animate-pulse">
                Message sent successfully!
              </p>
            )}
          </form>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="p-6 border-2 border-[#233554] rounded-lg hover:border-[#64ffda] transition-all">
              <h3 className="text-xl font-bold text-[#64ffda] mb-2">Email</h3>
              <p>muthupandir74738@gmail.com</p>
            </div>

            <div className="p-6 border-2 border-[#233554] rounded-lg hover:border-[#64ffda] transition-all">
              <h3 className="text-xl font-bold text-[#64ffda] mb-2">Social</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-[#64ffda] transition text-3xl"><FaInstagram/></a>
                <a href="#" className="hover:text-[#64ffda] transition text-3xl"><FaLinkedin/></a>
                <a href="#" className="hover:text-[#64ffda] transition text-3xl"><FaGithub/></a>
              </div>
            </div>

            <div className="p-6 border-2 border-[#233554] rounded-lg hover:border-[#64ffda] transition-all">
              <h3 className="text-xl font-bold text-[#64ffda] mb-2">Location</h3>
              <p>Madurai, TN, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;