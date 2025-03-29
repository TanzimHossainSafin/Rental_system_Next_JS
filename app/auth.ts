import GoogleProvider from "next-auth/providers/google";
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
const prisma = new PrismaClient();
const auth = NextAuth({
 
  providers:[

  CredentialsProvider({
   
    name: "email",
    
    credentials: {
      username: { label: "Username", type: "text", placeholder: "tanzim" },
      password: { label: "Password", type: "password" }
        
    },
    async authorize(credentials, req) {
      const username=credentials?.username;
      const password=credentials?.password;
      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (user) {
        // Convert the id to a string to match the User type expected by NextAuth
        return { ...user, id: user.id.toString() };
      } else {
        return null;
      }
    }
  }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ||" ",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || " "}),
        GithubProvider({
            clientId: process.env.GITHUB_ID || " ",
            clientSecret: process.env.GITHUB_SECRET || " ",
          }),
          
  ],
  //@ts-ignore
  // pages: {
  //   signIn: "/Components/signin", 
  // },
  // callbacks: {
  //   async redirect({ url, baseUrl }) {
  //     // Redirect to the homepage after sign-in
  //     return baseUrl;
  //   },
  secret: process.env.NEXTAUTH_SECRET || " "
});

export default auth;
