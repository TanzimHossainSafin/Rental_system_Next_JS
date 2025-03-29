import { signIn } from 'next-auth/react';

export default function SignUp() {

  return (
    
    <div>
      <form className="flex justify-center items-center flex-col gap-5 p-4 m-4 border border-red-300">
        <label>
          First Name:
          <input type="text" placeholder="firstname" />
        </label>
        <label>
          Last Name:
          <input type="text" placeholder="lastname" />
        </label>
        <label>
          Email:
          <input type="email" placeholder="email" />
        </label>
        <label>
          Password:
          <input type="password" placeholder="password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}