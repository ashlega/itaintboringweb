import { signIn } from "next-auth/react"

export default function AccessDenied() {
  return (
    <>
    <div
      className="justify-center w-full text-center accessdenied"
      
    >
      
     
        <a
          href="/api/auth/signin"
          onClick={(e) => {
            e.preventDefault()
            signIn()
          }}
        >
          You must be signed in to view this page
        </a>
      
    </div>
    </>
  )
}
