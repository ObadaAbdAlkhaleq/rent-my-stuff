'use client';

import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  return (
    <div className='grid grid-cols-1 md:grid-cols-5 gap-y-10 px-32 py-14 text-gray-600 bg-gray-100'>
      <div className=" space-y-4 text-xs text-gray-800">
        <h5 className='font-bold'>Resouces</h5>
        <p onClick={ () => router.push('/') } className="hover:cursor-pointer hover:underline">Project</p>
        <p onClick={ () => router.push('/') } className="hover:cursor-pointer hover:underline">Why RentMyStuff</p>
        <p onClick={ () => router.push('/') } className="hover:cursor-pointer hover:underline">E.C.H.O</p>
        <p onClick={ () => router.push('/') } className="hover:cursor-pointer hover:underline">Services</p>
        <p onClick={ () => router.push('/') } className="hover:cursor-pointer hover:underline">Updates</p>
      </div>
      <div className=" space-y-4 text-xs text-gray-800">
        <h5 className='font-bold'>Community</h5>
        <p onClick={ () => router.push('/') } className="hover:cursor-pointer hover:underline">Accessibility</p>
        <p onClick={ () => router.push('/') } className="hover:cursor-pointer hover:underline">Users Testimonies</p>
        <p onClick={ () => router.push('/') } className="hover:cursor-pointer hover:underline">Updates</p>
        <p onClick={ () => router.push('/') } className="hover:cursor-pointer hover:underline">Customer Service</p>
        <p onClick={ () => router.push('/') } className="hover:cursor-pointer hover:underline">Careers</p>
      </div>
      <div className=" space-y-4 text-xs text-gray-800">
        <h5 className='font-bold'>Media</h5>
        <p onClick={ () => router.push('/tos') } className="hover:cursor-pointer hover:underline">Privicy Policy</p>
        <p onClick={ () => router.push('/') } className="hover:cursor-pointer hover:underline">Development</p>
        <p onClick={ () => router.push('/tos') } className="hover:cursor-pointer hover:underline">Terms of Services</p>
      </div>
      <div className=" space-y-4 text-xs text-gray-800">
        <h5 className='font-bold'>Support</h5>
        <p onClick={ () => router.push('/') } className="hover:cursor-pointer hover:underline">Help Center</p>
        <p onClick={ () => router.push('/tos') } className="hover:cursor-pointer hover:underline">Trust and Safety</p>
        <p onClick={ () => router.push('/') } className="hover:cursor-pointer hover:underline">Complaints</p>
        <p onClick={ () => router.push('/') } className="hover:cursor-pointer hover:underline">Report a User</p>
        <p onClick={ () => router.push('/') } className="hover:cursor-pointer hover:underline">Report a Listing</p>
      </div>
      <div className=" space-y-4 text-xs text-gray-800">
        <h5 className='font-bold'>Contact</h5>
        <p onClick={ () => router.push('/') } className="hover:cursor-pointer hover:underline">Email</p>
        <p onClick={ () => router.push('/') } className="hover:cursor-pointer hover:underline">Phone</p>
      </div>
    </div>
  );
};

export default Footer;