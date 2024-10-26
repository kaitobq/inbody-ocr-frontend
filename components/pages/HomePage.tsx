import { Header } from "components/common"
import Link from "next/link"
import React from "react"

export default function HomePage() {
  return (
    <div className=" h-screen">
      {/* <Header /> */}
      <Link href="/signin" className="mt-10">
        Signin
      </Link>
      <Link href="/signup" className="mt-10">
        Signup
      </Link>
      HomePage
    </div>
  )
}
