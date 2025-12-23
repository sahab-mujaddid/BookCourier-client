import React from "react";

const ContactPage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
      
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Contact Information</h2>
        <p><strong>Support Email:</strong> support@bookcourier.com</p>
        <p><strong>Helpline:</strong> +1234567</p>
        <p><strong>Dispatch Center:</strong> 1212,Dhaka,Uttara</p>
        <div className="mt-4">
          
          <p className="text-sm text-gray-500 mt-2">Open Mon–Fri, 9am – 6pm</p>
        </div>
      </div>

      
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Send us a message</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Full Name" className="input input-bordered w-full" />
          <input type="email" placeholder="Email Address" className="input input-bordered w-full" />
          <select className="select select-bordered w-full">
            <option disabled selected>Choose a topic</option>
            <option>Delivery Issue</option>
            <option>Payment Inquiry</option>
            <option>General Question</option>
          </select>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="How can we help you today?"
          ></textarea>
          <button type="submit" className="btn btn-primary w-full">
            Send Message ➝
          </button>
          <p className="text-xs text-gray-500">
            By submitting this form, you agree to our Terms of Service.
          </p>
        </form>
        <div className="text-right">
          <a href="/faq" className="link link-primary text-sm">Frequently Asked Questions</a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;