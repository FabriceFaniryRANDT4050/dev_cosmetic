'use client'

// import { Dialog, DialogPanel } from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Heros() {
  return (
<div
  className="hero min-h-screen"
  style={{
    backgroundImage:
      "url(https://www.freepik.com/free-photo/cosmetic-male-beauty-products-with-display_44117200.htm#fromView=search&page=1&position=29&uuid=ae853300-6be8-44b1-ab5a-4681b026907d&query=cosmetic)",
  }}
>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
      <p className="mb-5">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
  )
}
