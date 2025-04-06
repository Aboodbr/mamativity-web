import {Link} from "react-router-dom"
import { Button } from "@/components/ui/button"
import logo from "@/assets/logo.png"
import heroImage from "@/assets/heroImage.png"

export default function Hero() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-white heroBG">
      {/* Decorative circles */}
      <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-blue-100/50 blur-2xl" />
      <div className="absolute top-60 right-40 w-24 h-24 rounded-full bg-pink-100/50 blur-2xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-blue-100/50 blur-2xl" />
      <div className="absolute bottom-40 right-60 w-28 h-28 rounded-full bg-pink-100/50 blur-2xl" />

      {/* Header */}
      <header className="relative z-10 ">
        <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="w-32">
            <img
              src={logo}
              alt="Mamativity Logo"
              width={120}
              height={40}
              className="object-contain"
            />
          </div>
          <div className="flex gap-4">
            <Link to="/signin">
              <Button
                variant="secondary"
                className="bg-gradient-to-r from-pink-100 to-pink-200 hover:opacity-90 shadow-md"
              >
                Sign in
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                variant="secondary"
                className="bg-gradient-to-r from-blue-100 to-blue-200 hover:opacity-90 shadow-md"
              >
                Sign up
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="z-10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="order-2 lg:order-1  h-full">
              <div className=" aspect-square max-w-2xl mx-auto">
                <img
                  src={heroImage}
                  alt="Peaceful sleeping baby"
                  className="object- absolute w-[50%] left-0 bottom-0 rounded-2xl h-auto minh-[70%]"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="order-1 lg:order-2 text-center lg:text-left bg-transparent">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Mamativity
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                The perfect to support your journey through motherhood from pregnancy to parenting
              </p>
              {/* <div className="mt-8">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 shadow-lg"
                  >
                    Start Your Journey
                  </Button>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

