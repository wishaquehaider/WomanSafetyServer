import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = { 

    pages: {
       signIn: '/sign-in'
    },

    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: 'Credentials',

          credentials: {
            username: { label: "Username", type: "text", placeholder: "jhon@mail.com " },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {

            const res = await fetch("/your/endpoint", {
              method: 'POST',
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" }
            })
            const user = await res.json()
      
            // If no error and we have user data, return it
            if (res.ok && user) {
              return user
            }
            // Return null if user data could not be retrieved
            return null
          }
        })
      ]
 }