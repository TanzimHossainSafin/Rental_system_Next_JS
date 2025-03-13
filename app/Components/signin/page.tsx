export default function SignIn() {
    return (
      <div className="flex gap-3">
        <form>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password"/>
        </form>
      </div>
    );
  }