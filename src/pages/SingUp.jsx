"use client"

import { useState } from "react"
import {Link} from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import logo from "@/assets/logo.png"
import StateModal from "@/modals/StatusModal"

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  })
  const [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle sign up logic here
  }

  return (
    <div className="min-h-screen p-4 md:p-6 BG">
      <div className="max-w-md mx-auto space-y-8">
        <div className="w-32 mx-auto">
          <img
            src={logo}
            alt="Mamativity Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold">Create Account</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <Input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
          </div>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
          <Button type="submit" className="w-full bg-gradient-to-r from-blue-300 to-blue-400 hover:opacity-90" onClick={() => open()}>
            Next
          </Button>
        </form>
        <div className="text-center">
          <Link to="/signin" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
      <StateModal isOpen={isOpen} close={close} type={"succes"}/>
    </div>
  )
}

