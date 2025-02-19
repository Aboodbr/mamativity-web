"use client"


import { useState } from "react"
import {Link} from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import StateModal from "@/modals/StatusModal"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle sign in logic here
  }

  return (
    <div className="min-h-screen p-4 md:p-6 BG">
      <div className="max-w-md mx-auto space-y-8">
        <div className="w-32 mx-auto">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-18%20215834-MdHh2pDKJLK6bb6TwvWtXVrzqHAsgi.png"
            alt="Mamativity Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-blue-300 to-blue-400 hover:opacity-90" onClick={() => open()}>
            Next
          </Button>
        </form>
        <div className="flex justify-between text-sm">
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Forgot passwords
          </Link>
        </div>
      </div>
      <StateModal isOpen={isOpen} close={close} type={"oops"}/>
    </div>
  )
}

