
import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Thanks to alumNexus, I landed my dream job at Microsoft. The mock interviews were incredibly realistic and the feedback was invaluable.",
    name: "Maya Patel",
    role: "Software Engineer",
    company: "Microsoft",
    avatar: "/lovable-uploads/8ee7877a-cbd3-4121-a549-d044b60c6f6f.png"
  },
  {
    quote: "The mentorship I received through alumNexus guided me through a career pivot into data science. My mentor still checks in with me!",
    name: "James Wilson",
    role: "Data Scientist",
    company: "Spotify",
    avatar: "/lovable-uploads/4bededbc-dba6-4e4a-a676-75063a634759.png"
  },
  {
    quote: "The subject hubs are incredible. I was able to connect with alumni in my specific field who provided insights I couldn't find anywhere else.",
    name: "Sophia Lee",
    role: "UX Designer",
    company: "Adobe",
    avatar: "/lovable-uploads/24f2d64b-472c-43e4-b881-f772a1d0e057.png"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-display mb-4">Success stories from our community</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how alumNexus has helped students and alumni build meaningful connections and advance their careers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-6 shadow-md relative hover-scale"
            >
              <div className="absolute -top-4 -left-4 bg-nexus-primary rounded-full p-2">
                <Quote className="h-5 w-5 text-white" />
              </div>
              <p className="text-gray-600 mb-6 pt-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
