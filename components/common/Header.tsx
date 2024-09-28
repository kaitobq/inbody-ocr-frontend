import Link from "next/link"
import React from "react"

export const Header = () => {
  return (
    <div className="fixed inset-x-0 top-0 z-50 px-3 py-3 bg-slate-100">
      <Link href={"/"}>
        <h1 className="font-bold text-lg">InBody OCR</h1>
      </Link>
    </div>
  )
}
